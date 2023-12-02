module.exports = function prepareBulkEmailDestinations(emailAlertSubscribers) {
  console.log("(+) Inside 'prepareBulkEmailDestinations()'");
  console.log("(+) emailAlertSubscribers: " + JSON.stringify(emailAlertSubscribers, null, 2));


  const destinations = emailAlertSubscribers.map((subscriber) => {
    console.log("(+) subscriber: " + JSON.stringify(subscriber, null, 2));

    return {
      Destination: {
        ToAddresses: [
          subscriber.emailAddress,
        ],
      },
    };
  });

  return destinations;
}