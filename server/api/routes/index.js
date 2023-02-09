import houseRouter from './house.js';
import loginRouter from './users.js';
import bookingRouter from './booking.js';
import messageRouter from './message.js';
import contactusRouter from './contactus.js';

export default (app) => {
    app.use('/', houseRouter);
    app.use('/', loginRouter);
    app.use('/', bookingRouter);
    app.use('/', messageRouter);
    app.use('/', contactusRouter);
}