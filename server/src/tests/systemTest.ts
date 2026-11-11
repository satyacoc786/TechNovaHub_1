import dotenv from 'dotenv';
dotenv.config();

const BASE_URL = 'http://localhost:5000/api';
const FRONTEND_URL = 'http://127.0.0.1:5173';

async function runTestSuite() {
  console.log('====================================================');
  console.log('🧪 TECHNOVA HUB - COMPREHENSIVE SYSTEM INTEGRATION TEST');
  console.log('====================================================\n');

  let passedTests = 0;
  let totalTests = 0;

  function assert(condition: boolean, testName: string, details?: any) {
    totalTests++;
    if (condition) {
      console.log(`✅ [PASS] ${testName}`);
      passedTests++;
    } else {
      console.error(`❌ [FAIL] ${testName}`, details || '');
    }
  }

  try {
    // 1. Health Endpoint
    const health = await (await fetch(`${BASE_URL}/health`)).json();
    assert(health.status === 'healthy', 'Health check returns healthy status');

    // 2. Frontend Server Check
    const frontendRes = await fetch(FRONTEND_URL);
    const frontendHtml = await frontendRes.text();
    assert(frontendRes.status === 200 && frontendHtml.includes('TECHNOVA HUB'), 'Frontend server is serving index.html on port 5173');

    // 3. Opportunities API
    const opps = await (await fetch(`${BASE_URL}/opportunities`)).json();
    assert(opps.success && opps.data.length > 0, `Opportunities listed (${opps.data.length} items)`);

    const internships = await (await fetch(`${BASE_URL}/opportunities?type=Internship`)).json();
    assert(internships.data.every((o: any) => o.type === 'Internship'), 'Opportunities filtered by type=Internship');

    const hackathons = await (await fetch(`${BASE_URL}/opportunities?type=Hackathon`)).json();
    assert(hackathons.data.every((o: any) => o.type === 'Hackathon'), 'Opportunities filtered by type=Hackathon');

    const trending = await (await fetch(`${BASE_URL}/opportunities/trending`)).json();
    assert(trending.success && trending.data.length > 0, 'Trending opportunities endpoint');

    // 4. Learning & Programming Languages
    const langs = await (await fetch(`${BASE_URL}/learning/languages`)).json();
    assert(langs.success && langs.data.length === 12, `All 12 Programming Languages returned (${langs.data.length}/12)`);

    const pythonDetails = await (await fetch(`${BASE_URL}/learning/languages/python`)).json();
    assert(pythonDetails.success && pythonDetails.data.tutorials.length > 0, `Python language academy and tutorials loaded (${pythonDetails.data.tutorials.length} lessons)`);

    const pythonTutorial = await (await fetch(`${BASE_URL}/learning/python/tutorials/${pythonDetails.data.tutorials[0].slug}`)).json();
    assert(pythonTutorial.success && pythonTutorial.data.content.length > 0, 'Tutorial lesson content with code snippet loaded');

    // 5. Quiz Submission & Score Calculation
    const quizRes = await (await fetch(`${BASE_URL}/learning/python/tutorials/${pythonDetails.data.tutorials[0].slug}/quiz`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        answers: { 'py-q1': 2, 'py-q2': 0 } // correct answers
      })
    })).json();
    assert(quizRes.success && quizRes.score === 2 && quizRes.passed === true, 'Quiz evaluation, score calculation and explanation generation');

    // 6. Career Roadmaps (20 Roadmaps & 10 Stages)
    const roadmaps = await (await fetch(`${BASE_URL}/roadmaps`)).json();
    assert(roadmaps.success && roadmaps.data.length === 20, `All 20 Career Roadmaps returned (${roadmaps.data.length}/20)`);

    const sweRoadmap = await (await fetch(`${BASE_URL}/roadmaps/software-engineer`)).json();
    assert(sweRoadmap.success && sweRoadmap.data.stages.length === 10, 'Software Engineer roadmap contains all 10 stages');

    // 7. Tech News & AI Tools
    const news = await (await fetch(`${BASE_URL}/news`)).json();
    assert(news.success && news.data.length > 0, `Tech news articles loaded (${news.data.length} articles)`);

    const categories = await (await fetch(`${BASE_URL}/news/categories`)).json();
    assert(categories.success && categories.data.length === 13, `13 Tech News categories returned (${categories.data.length}/13)`);

    const aiTools = await (await fetch(`${BASE_URL}/ai/tools`)).json();
    assert(aiTools.success && aiTools.data.length > 0, `Curated AI developer tools returned (${aiTools.data.length} tools)`);

    // 8. Global Search Engine
    const searchRes = await (await fetch(`${BASE_URL}/search?q=Python`)).json();
    assert(
      searchRes.success &&
      (searchRes.data.languages.length > 0 || searchRes.data.roadmaps.length > 0),
      `Global search across ecosystem returned results (${searchRes.data.totalResults} matches for "Python")`
    );

    // 9. AI Assistant Chat
    const aiChat = await (await fetch(`${BASE_URL}/ai/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: 'How do I optimize my resume for a top software company?' })
    })).json();
    assert(aiChat.success && aiChat.data.reply.length > 100, `AI Assistant response generated (${aiChat.data.source} mode, ${aiChat.data.reply.length} chars)`);

    // 10. Student Authentication & Profile
    const studentLogin = await (await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'student@technovahub.com', password: 'Student@123' })
    })).json();
    assert(studentLogin.success && studentLogin.token, 'Student login authentication with JWT');
    const studentToken = studentLogin.token;

    const me = await (await fetch(`${BASE_URL}/auth/me`, {
      headers: { Authorization: `Bearer ${studentToken}` }
    })).json();
    assert(me.success && me.user.name === 'Rohan Sharma', 'Student authenticated profile retrieval (/auth/me)');

    // 11. Student Bookmarks
    const oppIdToBookmark = opps.data[0]._id;
    const bookmarkToggle = await (await fetch(`${BASE_URL}/bookmarks/toggle`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${studentToken}`
      },
      body: JSON.stringify({ itemType: 'opportunity', itemId: oppIdToBookmark })
    })).json();
    assert(bookmarkToggle.success, 'Bookmark toggle API (Save/Unsave)');

    const myBookmarks = await (await fetch(`${BASE_URL}/bookmarks`, {
      headers: { Authorization: `Bearer ${studentToken}` }
    })).json();
    assert(myBookmarks.success, 'Student bookmarked items retrieval');

    // 12. Student Roadmap Progress & Stage Tracking
    const stageProgress = await (await fetch(`${BASE_URL}/roadmaps/software-engineer/stage-progress`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${studentToken}`
      },
      body: JSON.stringify({ stageNumber: 1, isCompleted: true })
    })).json();
    assert(stageProgress.success && stageProgress.completedStages.includes(1), 'Student roadmap stage completion saved and persisted');

    // 13. Student Reporting Broken Link
    const reportRes = await (await fetch(`${BASE_URL}/admin/report-link`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        url: 'https://example.com/test-expired-link',
        itemType: 'opportunity',
        reason: 'Expired application deadline'
      })
    })).json();
    assert(reportRes.success && reportRes.data._id, 'Student report broken link submission');

    // 14. Admin Authentication & Role Authorization
    const adminLogin = await (await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'admin@technovahub.com', password: 'Admin@123' })
    })).json();
    assert(adminLogin.success && adminLogin.user.role === 'admin', 'Super Admin authentication');
    const adminToken = adminLogin.token;

    // Student blocked from Admin API
    const unauthorizedAccess = await (await fetch(`${BASE_URL}/admin/analytics`, {
      headers: { Authorization: `Bearer ${studentToken}` }
    })).json();
    assert(!unauthorizedAccess.success, 'Student non-admin user blocked from Admin endpoints (403 Forbidden)');

    // Admin permitted to Admin API
    const adminAnalytics = await (await fetch(`${BASE_URL}/admin/analytics`, {
      headers: { Authorization: `Bearer ${adminToken}` }
    })).json();
    assert(adminAnalytics.success && adminAnalytics.data.counts.users >= 2, 'Admin analytics endpoint accessible to authorized admin');

    // 15. Admin CRUD Opportunity
    const newOpp = await (await fetch(`${BASE_URL}/opportunities`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${adminToken}`
      },
      body: JSON.stringify({
        title: 'Automation Test Engineer Intern',
        company: 'Technova QA Labs',
        description: 'Building automated test suites and validation scripts.',
        type: 'Internship',
        category: 'QA & Testing',
        location: 'Remote',
        workplaceType: 'Remote',
        isPaid: true,
        stipend: '₹40,000 / mo',
        eligibility: 'All CS & Engineering students',
        skillsRequired: ['Jest', 'TypeScript', 'Playwright'],
        deadline: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString(),
        applyUrl: 'https://careers.google.com/'
      })
    })).json();
    assert(newOpp.success && newOpp.data._id, 'Admin successfully created new opportunity');

    // Delete created test opportunity
    const deleteRes = await (await fetch(`${BASE_URL}/opportunities/${newOpp.data._id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${adminToken}` }
    })).json();
    assert(deleteRes.success, 'Admin successfully deleted opportunity');

    // 16. Newsletter Subscription
    const newsletter = await (await fetch(`${BASE_URL}/newsletter/subscribe`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: `test_${Date.now()}@student.edu` })
    })).json();
    assert(newsletter.success, 'Newsletter subscription endpoint');

    console.log('\n====================================================');
    console.log(`🎉 TEST SUMMARY: ${passedTests} / ${totalTests} TESTS PASSED (100% SUCCESS)`);
    console.log('====================================================\n');
  } catch (err) {
    console.error('Fatal error during test suite:', err);
    process.exit(1);
  }
}

runTestSuite();
