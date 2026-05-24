import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GAMES_DATA, PAYMENT_METHODS } from './src/gamesData';
import { Transaction } from './src/types';
import dotenv from 'dotenv';
import crypto from 'crypto';

// Load environment variables
dotenv.config();

// Lazy initialize midtrans-client to avoid server crash if keys are missing
let snapClient: any = null;
const MIDTRANS_SERVER_KEY = process.env.MIDTRANS_SERVER_KEY;
const MIDTRANS_CLIENT_KEY = process.env.MIDTRANS_CLIENT_KEY;

if (MIDTRANS_SERVER_KEY) {
  try {
    // Dynamically require/import to prevent startup failures on certain system profiles
    import('midtrans-client').then((midtrans) => {
      snapClient = new midtrans.Snap({
        isProduction: false, // Default to sandbox
        serverKey: MIDTRANS_SERVER_KEY,
        clientKey: MIDTRANS_CLIENT_KEY || ''
      });
      console.log('✅ Real Midtrans Client initialized in sandbox mode.');
    }).catch((e) => {
      console.warn('⚠️ Gagal memuat library midtrans-client. Menggunakan mode simulasi.', e);
    });
  } catch (e) {
    console.warn('⚠️ Gagal inisialisasi Midtrans Client:', e);
  }
} else {
  console.log('💡 Tanpa MIDTRANS_SERVER_KEY. Berjalan dalam mode SIMULATOR MIDTRANS SNAP.');
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // In-memory data store for transactions (persistent until server restarted)
  const transactions: Map<string, Transaction> = new Map();

  // Seeding simple demo transactions
  const demoTx: Transaction = {
    id: 'JOKI-938210',
    gameId: 'mobile-legends',
    gameName: 'Mobile Legends',
    targetId: '98274921',
    targetZone: '2023',
    nominalId: 'ml-wdp',
    nominalName: 'Weekly Diamond Pass (WDP)',
    price: 27500,
    fee: 300,
    totalPrice: 27800,
    paymentMethod: 'qris',
    whatsapp: '081234567890',
    status: 'SUCCESS',
    createdAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(), // 30 mins ago
    paymentExpiredAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    qrCodeUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=simulate_qris_gopay_jokitiers'
  };
  transactions.set(demoTx.id, demoTx);

  const demoTx2: Transaction = {
    id: 'JOKI-482931',
    gameId: 'joki-rank',
    gameName: 'Joki Rank Mobile Legends',
    targetId: 'joki_epic_star',
    targetZone: 'Epic V -> Epic I',
    nominalId: 'joki-epic',
    nominalName: 'Epic (Per Bintang) x 4 Bintang',
    price: 28000,
    fee: 2500,
    totalPrice: 30500,
    paymentMethod: 'bca_va',
    whatsapp: '089876543210',
    status: 'PENDING',
    createdAt: new Date().toISOString(),
    paymentExpiredAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    vaNumber: '11823089876543210'
  };
  transactions.set(demoTx2.id, demoTx2);

  // 1. Get Games Data
  app.get('/api/games', (req, res) => {
    res.json(GAMES_DATA);
  });

  // 2. Get Single Transaction Info
  app.get('/api/transactions/:id', (req, res) => {
    const tx = transactions.get(req.params.id);
    if (!tx) {
      return res.status(404).json({ error: 'Transaksi tidak ditemukan.' });
    }
    res.json(tx);
  });

  // 3. Get All Transactions (for analytics or debug)
  app.get('/api/transactions', (req, res) => {
    res.json(Array.from(transactions.values()).sort((a,b) => b.createdAt.localeCompare(a.createdAt)));
  });

  // 4. Create Transaction / Payment Charge
  app.post('/api/payment/create-charge', async (req, res) => {
    try {
      const { gameId, nominalId, paymentMethodId, inputFields, whatsapp } = req.body;

      // Find Game
      const game = GAMES_DATA.find(g => g.id === gameId);
      if (!game) {
        return res.status(400).json({ error: 'Game tidak ditemukan.' });
      }

      // Find Nominal Info
      const nominal = game.nominals.find(n => n.id === nominalId);
      if (!nominal) {
        return res.status(400).json({ error: 'Pilihan nominal pengisian tidak valid.' });
      }

      // Find Payment Method
      const payMethod = PAYMENT_METHODS.find(p => p.id === paymentMethodId);
      if (!payMethod) {
        return res.status(400).json({ error: 'Metode pembayaran tidak didukung.' });
      }

      // Extract User ID inputs
      const targetId = inputFields.userId || inputFields.riotId || inputFields.uid || inputFields.username || inputFields.lobbyId || 'N/A';
      const targetZone = inputFields.zoneId || inputFields.server || inputFields.accountType || '';

      const invoiceId = `JOKI-${Math.floor(100000 + Math.random() * 900000)}`;
      const price = nominal.price;
      const fee = payMethod.fee;
      const totalPrice = price + fee;

      const txDate = new Date();
      const expireDate = new Date(txDate.getTime() + 2 * 60 * 60 * 1000); // 2 hours expiration

      let vaNumber = '';
      let qrCodeUrl = '';
      let paymentUrl = '';

      // Mock bank virtual account or payment reference numbers
      if (paymentMethodId === 'bca_va') {
        vaNumber = `1182308${Math.floor(100000000 + Math.random() * 900000000)}`;
      } else if (paymentMethodId === 'mandiri_va') {
        vaNumber = `88301${Math.floor(100000000000 + Math.random() * 900000000000)}`;
      } else if (paymentMethodId === 'bni_va') {
        vaNumber = `988301${Math.floor(1000000000 + Math.random() * 9000000000)}`;
      } else if (paymentMethodId === 'qris') {
        // Use the user's uploaded QRIS image saved in /public/images/qris.png
        qrCodeUrl = '/images/qris.png';
      } else if (paymentMethodId === 'gopay' || paymentMethodId === 'dana') {
        // Set the user's DANA / GoPay number for direct transfer copying
        vaNumber = '089506740917';
      } else if (paymentMethodId === 'indomaret' || paymentMethodId === 'alfamart') {
        vaNumber = `JOKI-${Math.floor(20260000 + Math.random() * 99999)}`;
      }

      // Prepare Local Transaction Object representational of model
      const newTransaction: Transaction = {
        id: invoiceId,
        gameId,
        gameName: game.name,
        targetId,
        targetZone,
        nominalId,
        nominalName: nominal.name,
        price,
        fee,
        totalPrice,
        paymentMethod: paymentMethodId,
        whatsapp,
        status: 'PENDING',
        createdAt: txDate.toISOString(),
        paymentExpiredAt: expireDate.toISOString(),
        vaNumber: vaNumber || undefined,
        qrCodeUrl: qrCodeUrl || undefined,
        paymentUrl: paymentUrl || undefined
      };

      // If Real Midtrans client exists, fetch true payment gateway Snap URL
      if (snapClient) {
        try {
          const midtransPayload = {
            transaction_details: {
              order_id: invoiceId,
              gross_amount: totalPrice,
            },
            credit_card: {
              secure: true
            },
            customer_details: {
              first_name: targetId,
              phone: whatsapp,
              email: `${targetId.toLowerCase().replace(/\s+/g, '')}@jokitiers.com`
            },
            item_details: [{
              id: nominalId,
              price: totalPrice,
              quantity: 1,
              name: `${game.name} - ${nominal.name}`
            }]
          };

          const snapResponse = await snapClient.createTransaction(midtransPayload);
          newTransaction.paymentUrl = snapResponse.redirect_url;
          newTransaction.snapToken = snapResponse.token;
          console.log(`🔌 [Midtrans] Created Transaction Token: ${snapResponse.token} for ${invoiceId}`);
        } catch (midError) {
          console.error('❌ Midtrans API error, falling back to simulator:', midError);
        }
      }

      // Save to memory
      transactions.set(invoiceId, newTransaction);
      res.status(201).json(newTransaction);
    } catch (error: any) {
      console.error('Error creating charge:', error);
      res.status(500).json({ error: 'Gagal memproses pembuatan transaksi. Silakan coba kembali.' });
    }
  });

  // 4b. Genuine Midtrans Webhook Notification Route
  // Midtrans triggers this callback automatically upon payment states matching
  app.post('/api/payment/notification', (req, res) => {
    try {
      const {
        order_id,
        transaction_status,
        fraud_status,
        signature_key,
        status_code,
        gross_amount
      } = req.body;

      console.log(`📥 [Midtrans Webhook Received] ID: ${order_id}, Status: ${transaction_status}, Code: ${status_code}`);

      const tx = transactions.get(order_id);
      if (!tx) {
        console.warn(`⚠️ [Midtrans Webhook] Invoice ID '${order_id}' not found in database memory.`);
        return res.status(404).json({ error: 'Transaksi tidak ditemukan.' });
      }

      // Security Signature Key Verification via SHA-512 Hash sum
      if (MIDTRANS_SERVER_KEY && signature_key) {
        const hashInput1 = order_id + status_code + gross_amount + MIDTRANS_SERVER_KEY;
        const hash1 = crypto.createHash('sha512').update(hashInput1).digest('hex');
        
        // Also support potential trailing decimal variations safely (.00)
        const gross_amount_str = Number(gross_amount).toFixed(0);
        const hashInput2 = order_id + status_code + gross_amount_str + MIDTRANS_SERVER_KEY;
        const hash2 = crypto.createHash('sha512').update(hashInput2).digest('hex');

        if (signature_key !== hash1 && signature_key !== hash2) {
          console.warn(`🚨 [Midtrans Webhook] FRAUD/SECURITY WARNING: Signature mismatch. Verification check failed!`);
          return res.status(403).json({ error: 'Tanda tangan transaksi tidak cocok (Failed signature verification).' });
        }
        console.log(`✅ [Midtrans Webhook] Signature hash verified successfully for invoice '${order_id}'`);
      }

      // Map status codes cleanly
      if (transaction_status === 'capture') {
        if (fraud_status === 'challenge') {
          tx.status = 'PENDING';
        } else if (fraud_status === 'accept') {
          tx.status = 'SUCCESS';
        }
      } else if (transaction_status === 'settlement') {
        tx.status = 'SUCCESS';
      } else if (transaction_status === 'cancel' || transaction_status === 'deny' || transaction_status === 'expire') {
        tx.status = 'FAILED';
      } else if (transaction_status === 'pending') {
        tx.status = 'PENDING';
      }

      transactions.set(order_id, tx);
      console.log(`🎉 [Midtrans Webhook] Transaction status updated to: ${tx.status}`);

      // Respond with 200 OK to inform Midtrans that notification has been consumed correctly
      res.status(200).json({ status: 'OK', message: 'Notifikasi pembayaran berhasil diproses.' });
    } catch (err) {
      console.error('❌ Error handling Midtrans Notification Webhook:', err);
      res.status(500).json({ error: 'Gagal memproses feedback webhook.' });
    }
  });

  // 5. Simulate webhook payment notification or client manual confirmation
  // Perfect for demonstrating a complete, reactive ecosystem
  app.post('/api/payment/simulate-pay', (req, res) => {
    const { id, status } = req.body;
    const tx = transactions.get(id);
    if (!tx) {
      return res.status(404).json({ error: 'Transaksi tidak ditemukan.' });
    }

    tx.status = status || 'SUCCESS';
    transactions.set(id, tx);
    res.json({ message: `Status transaksi ${id} berhasil diperbarui ke ${tx.status}.`, transaction: tx });
  });

  // Vite Server Middleware integration (React live rebuild serving)
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 JOKITIERS full-stack server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
