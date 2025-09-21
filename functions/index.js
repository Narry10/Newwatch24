const functions = require("firebase-functions");
const admin = require("firebase-admin");
const next = require("next");

// Khởi tạo firebase-admin (Functions có sẵn Application Default Credentials)
if (!admin.apps.length) {
  admin.initializeApp();
}

// Trỏ Next tới config ở root
const app = next({ 
  dev: false, 
  conf: require("../next.config.js") 
});
const handle = app.getRequestHandler();

// Hàm SSR chính — tiếp nhận mọi request (Hosting rewrite)
exports.nextServer = functions
  .region("asia-southeast1")       // đổi region bạn muốn
  .runWith({ 
    memory: "1GB", 
    minInstances: 0,
    maxInstances: 10,
    timeoutSeconds: 60
  })
  .https.onRequest(async (req, res) => {
    // Set CORS headers
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    res.set('Access-Control-Allow-Headers', 'Content-Type, Authorization, x-api-key');
    
    if (req.method === 'OPTIONS') {
      res.status(200).end();
      return;
    }
    
    try {
      await app.prepare();
      return handle(req, res);
    } catch (error) {
      console.error('Next.js error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
