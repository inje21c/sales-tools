(function () {
  window.SalesTools = window.SalesTools || {};
  window.SalesTools.utils = {
    formatNumber: function (n) {
      return Math.round(n || 0).toLocaleString('ko-KR');
    },
    formatWon: function (n) {
      return Math.round(n || 0).toLocaleString('ko-KR') + '원';
    },
    formatQty: function (n) {
      return Math.round(n || 0).toLocaleString('ko-KR') + ' Kg';
    },
    todayStr: function () {
      var d = new Date();
      return d.getFullYear() + '-' +
        String(d.getMonth() + 1).padStart(2, '0') + '-' +
        String(d.getDate()).padStart(2, '0');
    },
    periodOfDate: function (dateStr) {
      if (!dateStr) return null;
      var parts = String(dateStr).split('-');
      if (parts.length < 2) return null;
      return parseInt(parts[0], 10) + '-' + parseInt(parts[1], 10);
    },
    lotDaysUntilExpiry: function (expDate) {
      if (!expDate) return null;
      var today = new Date();
      today.setHours(0, 0, 0, 0);
      var exp = new Date(expDate + 'T00:00:00');
      return Math.round((exp - today) / 86400000);
    }
  };
}());
