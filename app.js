const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const homeRoutes = require('./routes/home');
const marketRoutes = require('./routes/market');
const storeRoutes = require('./routes/store');
const listingsRoutes = require('./routes/listings');
const agriTourismRoutes = require('./routes/agriTourism');
const auctionRoutes = require('./routes/auction');
const benefitSharingRoutes = require('./routes/benefitSharing');
const carbonTradeRoutes = require('./routes/carbonTrade');
const certificationRoutes = require('./routes/certification');
const buyersClubRoutes = require('./routes/buyersClub');
const cloudWarehouseRoutes = require('./routes/cloudWarehouse');
const coldchainReserveRoutes = require('./routes/coldchainReserve');
const communityRoutes = require('./routes/community');
const consultationRoutes = require('./routes/consultation');
const courseRoutes = require('./routes/course');
const dashboardRoutes = require('./routes/dashboard');
const ebooksRoutes = require('./routes/ebooks');
const exportTradeRoutes = require('./routes/exportTrade');
const exportZoneRoutes = require('./routes/exportZone');
const farmManagementRoutes = require('./routes/farmManagement');
const financeRoutes = require('./routes/finance');
const fruitSaleRoutes = require('./routes/fruitSale');
const fundingTrackingRoutes = require('./routes/fundingTracking');
const knowledgeRoutes = require('./routes/knowledge');
const iotDeviceRoutes = require('./routes/iotDevice');
const landTransferRoutes = require('./routes/landTransfer');
const liveRoutes = require('./routes/live');
const logisticsOptimizationRoutes = require('./routes/logisticsOptimization');
const logisticsTrackingRoutes = require('./routes/logisticsTracking');
const marketV2Routes = require('./routes/marketV2');
const onlineApplicationRoutes = require('./routes/onlineApplication');
const pestControlRoutes = require('./routes/pestControl');
const pesticideReportRoutes = require('./routes/pesticideReport');
const pesticideTestRoutes = require('./routes/pesticideTest');
const planningDesignRoutes = require('./routes/planningDesign');
const plantingGuidanceRoutes = require('./routes/plantingGuidance');
const policyMatchingRoutes = require('./routes/policyMatching');
const postHarvestTechRoutes = require('./routes/postHarvestTech');
const processedTradeRoutes = require('./routes/processedTrade');
const qualityImprovementRoutes = require('./routes/qualityImprovement');
const smartWarehouseRoutes = require('./routes/smartWarehouse');
const socialServiceRoutes = require('./routes/socialService');
const sortingWeighingRoutes = require('./routes/sortingWeighing');
const supplychainAnalysisRoutes = require('./routes/supplychainAnalysis');
const traceRoutes = require('./routes/trace');
const supplychainFinanceRoutes = require('./routes/supplychainFinance');

const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Use authentication routes
app.use('/api/auth', authRoutes);
// Use home routes
app.use('/api/home', homeRoutes);
// Use market routes
app.use('/api/market', marketRoutes);
// Use store routes
app.use('/api/store', storeRoutes);
// Use listings routes
app.use('/api/listings', listingsRoutes);
// Use agri-tourism routes
app.use('/api/agri-tourism', agriTourismRoutes);
// Use auction routes
app.use('/api/auction', auctionRoutes);
// Use benefit sharing routes (some routes are at root, some at /api)
app.use('/', benefitSharingRoutes);
// Use carbon trade routes
app.use('/api/carbon-trade', carbonTradeRoutes);
// Use certification routes
app.use('/api/certification', certificationRoutes);
// Use buyers club routes
app.use('/api/buyers-club', buyersClubRoutes);
// Use cloud warehouse routes
app.use('/api/cloud-warehouse', cloudWarehouseRoutes);
// Use coldchain reserve routes
app.use('/api/coldchain', coldchainReserveRoutes);
// Use community routes
app.use('/api/community', communityRoutes);
// Use consultation routes
app.use('/api/consultations', consultationRoutes);
app.use('/api/experts', consultationRoutes); // Experts route also in consultation.js
// Use course routes
app.use('/api/courses', courseRoutes);
app.use('/api/users', courseRoutes); // Some course routes are under /api/users
// Use dashboard routes
app.use('/api/dashboard', dashboardRoutes);
// Use ebooks routes
app.use('/api/ebooks', ebooksRoutes);
// Use export trade routes
app.use('/api/export-trade', exportTradeRoutes);
// Use export zone routes
app.use('/api/export-zone', exportZoneRoutes);
// Use farm management routes
app.use('/api/farm-management', farmManagementRoutes);
// Use finance routes
app.use('/api/finance', financeRoutes);
// Use fruit sale routes
app.use('/api/fruit-sale', fruitSaleRoutes);
// Use funding tracking routes
app.use('/api/funding', fundingTrackingRoutes);
// Use knowledge routes
app.use('/api/knowledge', knowledgeRoutes);
// Use IoT device routes
app.use('/api/iot', iotDeviceRoutes);
// Use land transfer routes
app.use('/api/land-transfer', landTransferRoutes);
// Use live routes
app.use('/api/live', liveRoutes);
// Use logistics optimization routes
app.use('/api/logistics/optimization', logisticsOptimizationRoutes);
// Use logistics tracking routes
app.use('/api/logistics/tracking', logisticsTrackingRoutes);
// Use market V2 routes
app.use('/api/market-data', marketV2Routes);
// Use online application routes
app.use('/api/applications', onlineApplicationRoutes);
// Use pest control routes
app.use('/api/pest-control', pestControlRoutes);
// Use pesticide report routes
app.use('/api/pesticide-reports', pesticideReportRoutes);
// Use pesticide test routes
app.use('/api/pesticide-tests', pesticideTestRoutes);
// Use planning design routes
app.use('/api/planning-design', planningDesignRoutes);
// Use planting guidance routes
app.use('/api/planting-guidance', plantingGuidanceRoutes);
// Use policy matching routes
app.use('/api/policies', policyMatchingRoutes);
app.use('/api/policy-matching', policyMatchingRoutes);
// Use post-harvest tech routes
app.use('/api/post-harvest-tech', postHarvestTechRoutes);
// Use processed trade routes
app.use('/api/processed-trade', processedTradeRoutes);
// Use quality improvement routes
app.use('/api/quality-improvement', qualityImprovementRoutes);
// Use smart warehouse routes
app.use('/api/smart-warehouse', smartWarehouseRoutes);
// Use social service routes
app.use('/api/social-services', socialServiceRoutes);
// Use sorting and weighing routes
app.use('/api/sorting-weighing', sortingWeighingRoutes);
// Use supplychain analysis routes
app.use('/api/supplychain', supplychainAnalysisRoutes);
// Use trace routes
app.use('/api/trace', traceRoutes);
// Use supplychain finance routes
app.use('/api/supplychain-finance', supplychainFinanceRoutes);

// Basic route for testing
app.get('/', (req, res) => {
    res.send('Welcome to the Node.js Backend API!');
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
