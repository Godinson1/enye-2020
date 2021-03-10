const getUserMessage = () => {
  var data = [
      [22, "It's bed time, Get some sleep."],
      [16, "Good evening, Stay safe!"],
      [12, "Good afternoon, Wash your hands."],
      [5, "Good morning, Great day!"],
      [0, "Working late? Try rest!"],
    ],
    hr = new Date().getHours();
  for (var i = 0; i < data.length; i++) {
    if (hr >= data[i][0]) {
      return `${data[i][1]}`;
    }
  }
};

export { getUserMessage };
