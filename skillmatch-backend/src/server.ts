import app from '../src/app';
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log('Recruiter endpoints:');
  console.log(`- POST http://localhost:${PORT}/api/recruiters/signup`);
  console.log(`- POST http://localhost:${PORT}/api/recruiters/login`);
  console.log('Admin endpoints:');
  console.log(`- POST http://localhost:${PORT}/api/admin/login`);
  console.log('\nJob Seeker endpoints:');
  console.log(`- POST http://localhost:${PORT}/api/job-seekers/signup`);
  console.log(`- POST http://localhost:${PORT}/api/job-seekers/login`);
  
});
