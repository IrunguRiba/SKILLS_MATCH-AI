import app from './app';
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log('Recruiter endpoints:');
console.log(`- POST http://localhost:${PORT}/api/recruiters/signup`);
console.log(`- POST http://localhost:${PORT}/api/recruiters/login`);
console.log(`- GET  http://localhost:${PORT}/api/recruiters/get`);
console.log(`- DELETE http://localhost:${PORT}/api/recruiters/delete`);
console.log('\nAdmin Endpoints:');
console.log(`- POST   http://localhost:${PORT}/api/admin/signup`);
console.log(`- POST   http://localhost:${PORT}/api/admin/login`);
console.log(`- GET    http://localhost:${PORT}/api/admin        (use ?id=, ?username=, or ?email= query params)`);
console.log(`- DELETE http://localhost:${PORT}/api/admin        (use ?id=, ?username=, or ?email= query params)`);
  console.log('\nJob Seeker Endpoints:');
console.log(`- POST   http://localhost:${PORT}/api/jobseeker/signup`);
console.log(`- POST   http://localhost:${PORT}/api/jobseeker/login`);
console.log(`- GET    http://localhost:${PORT}/api/jobseeker        (use ?id= or ?email=)`);
console.log(`- DELETE http://localhost:${PORT}/api/jobseeker        (use ?id=, ?email=, or ?first_name=)`);

  
});
