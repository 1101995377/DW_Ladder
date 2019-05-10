(function() {
  $script.ready('om-state', updateMenuByState);
  return;

  function updateMenuByState() {
    var state = OmegaPopup.state;
    if (state.proxyNotControllable) {
      location.href = '/popup/proxy_not_controllable.html';
      return;
    }
    if(state.currentProfileName=="direct"){
      document.getElementById('onoffswitch').checked=false;
    }else{
      document.getElementById('onoffswitch').checked=true;
    }
  }

})();
