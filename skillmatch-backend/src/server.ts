import app from './app';
const PORT = process.env.PORT || 3000;


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log('Recruiter endpoints:');
console.log(`- POST http://localhost:${PORT}/api/recruiter/signup`);
console.log(`- POST http://localhost:${PORT}/api/recruiter/login`);
console.log(`- GET  http://localhost:${PORT}/api/recruitersget`);
console.log(`- DELETE http://localhost:${PORT}/api/recruiters/delete`);
console.log('\nAdmin Endpoints:');
console.log(`- POST   http://localhost:${PORT}/api/admin/signup`);
console.log(`- POST   http://localhost:${PORT}/api/admin/login`);
console.log(`- GET    http://localhost:${PORT}/api/admin        (use ?id=, ?username=, or ?email= query params)`);
console.log(`- DELETE http://localhost:${PORT}/api/admin        (use ?id=, ?username=, or ?email= query params)`);
  console.log('\nJob Seeker Endpoints:');
console.log(`- POST   http://localhost:${PORT}/api/job-seeker/signup`);
console.log(`- POST   http://localhost:${PORT}/api/job-seeker/login`);
console.log(`- GET    http://localhost:${PORT}/api/job-seeker        (use ?id= or ?email=)`);
console.log(`- DELETE http://localhost:${PORT}/api/job-seeker        (use ?id=, ?email=, or ?first_name=)`);

  
});
