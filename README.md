# inspection-time

Based on
- https://en.wikipedia.org/wiki/Inspection_time
- https://www.vox.com/2016/5/25/11683192/iq-testing-intelligence

## Dependencies
- NodeJS
- mysql with initialized db

## Run
```
mysql -uroot < inspection_time.sql
npm install
npm start
```
Launches server on [http://localhost:3000](http://localhost:3000)

## Notes
No effort has been made to avoid enhance security; SQL injection would be very easy.

NodeJS Express was chosen as a lightweight httpd, although other languages could also have been used with the same end
goal.

Due to lack of time I have not:
- optimized some code duplication, in particular the SQL queries
- implemented any server API to get statistics
- invested extra effort into implementing the test according to what might be used in the official test
- given much thought to UX/UI

