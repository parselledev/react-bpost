export const mailsDelete = (mails, id) => {
  const newMails = {};
  Object.keys(mails).forEach(key => {
    if(key != id) newMails[key] = mails[key];
  });
  return newMails;
}