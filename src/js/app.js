App = {
  web3Provider: null,
  contracts: {},

  init: async function() {
    // Load watches data from watches.json
    $.getJSON('../watches.json', function(data) {
      var watchRow = $('#watchRow');
      var watchTemplate = $('#watchTemplate');

      for (i = 0; i < data.length; i ++) {
        watchTemplate.find('.panel-title').text(data[i].name);
        watchTemplate.find('img').attr('src', data[i].picture);
        watchTemplate.find('.watch-brand').text(data[i].brand);
        watchTemplate.find('.watch-color').text(data[i].color);
        watchTemplate.find('.watch-price').text(data[i].price);
        watchTemplate.find('.btn-buy').attr('data-id', data[i].id);

        watchRow.append(watchTemplate.html());
      }
    });

    return await App.initWeb3();
  },

  // initialize Web3
  initWeb3: async function() {
    return App.initContract();
  },

  // initialize contract
  initContract: function() {
    return App.bindEvents();
  },

  // bind the click event to the button element with class '.btn-buy'
  bindEvents: function() {
    $(document).on('click', '.btn-buy', App.handleBuy);
  },

  // this function is to mark (change) the status from "buy" to "sold"
  markSold: function(buyers, account) {
  },

  handleBuy: function(event) {
    event.preventDefault();

    var watchId = parseInt($(event.target).data('id'));
  }

};

$(function() {
  $(window).load(function() {
    App.init();
  });
});
