#!/usr/bin/node
import { createQueue } from 'kue';

const queue = createQueue();

const sendNotification = (mobileNumber, msg) => {
  console.log(
    `Sending notification to ${mobileNumber},`,
    'with message:',
    msg,
  );
};

queue.process('push_notification_code', (job, done) => {
  sendNotification(job.data.mobileNumber, job.data.msg);
  done();
});
