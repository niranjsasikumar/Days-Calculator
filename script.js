function formatDateInput(date) {
  year = date.getFullYear();

  month = date.getMonth() + 1;
  if (month < 10) {
    month = "0" + month;
  }

  day = date.getDate();
  if (day < 10) {
    day = "0" + day;
  }

  return year + "-" + month + "-" + day;
}

let today = new Date();
today.setHours(0, 0, 0, 0);

function setAttributes() {
  let du = document.getElementById("du");
  let ds = document.getElementById("ds");

  du.setAttribute("min", formatDateInput(today));
  ds.setAttribute("max", formatDateInput(today));
}

function formatDateOutput(date) {
  let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  let month = months[date.getMonth()];

  return month + " " + date.getDate() + ", " + date.getFullYear();
}

var app = angular.module("daysCalculator", []);

app.controller("ctrl", function($scope) {
    $scope.duDate = new Date();
    $scope.duDate.setHours(0, 0, 0, 0);
    $scope.duDate.setDate(today.getDate() + 1);

    $scope.dsDate = new Date();
    $scope.dsDate.setHours(0, 0, 0, 0);
    $scope.dsDate.setDate(today.getDate() - 1);

    $scope.startDate = new Date();
    $scope.startDate.setHours(0, 0, 0, 0);
    $scope.startDate.setDate(today.getDate() - 1);

    $scope.endDate = new Date();
    $scope.endDate.setHours(0, 0, 0, 0);
    $scope.endDate.setDate(today.getDate() + 1);
});

app.filter("daysUntil", function() {
  return function(date) {
    let daysUntil = Math.ceil((date - today) / (1000 * 60 * 60 * 24));

    if (daysUntil == 1) {
      return daysUntil + " day until " + formatDateOutput(date);
    }
    else if (daysUntil >= 0) {
      return daysUntil + " days until " + formatDateOutput(date);
    }
    else {
      return "Invalid date. Please select a valid date after today's date.";
    }
  };
});

app.filter("daysSince", function() {
  return function(date) {
    let daysSince = Math.ceil((today - date) / (1000 * 60 * 60 * 24));

    if (daysSince == 1) {
      return daysSince + " day since " + formatDateOutput(date);
    }
    else if (daysSince >= 0) {
      return daysSince + " days since " + formatDateOutput(date);
    }
    else {
      return "Invalid date. Please select a valid date before today's date.";
    }
  };
});

app.filter("daysBetween", function() {
  return function(startDate, endDate) {
    let daysBetween = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));

    if (daysBetween == 1) {
      return daysBetween + " day between " + formatDateOutput(startDate) + " and " + formatDateOutput(endDate);
    }
    else if (daysBetween >= 0) {
      return daysBetween + " days between " + formatDateOutput(startDate) + " and " + formatDateOutput(endDate);
    }
    else {
      return "Invalid input. Please ensure that the start date is a date before the end date and that both dates are valid.";
    }
  }
});
