(function() {
    $script.ready('om-state', updateMenuByState);
    return;
    function updateMenuByState() {
        var state = OmegaPopup.state;
        if(state.currentProfileName=="direct"){
            document.getElementById('onoffswitch').checked=false;
        }else{
            document.getElementById('onoffswitch').checked=true;
        }
    }
}).call(this);

(function() {
    OmegaPopup.applyProfile = applyProfile;
    return;

    function closePopup() {
        window.close();
        document.body.style.opacity = 0;
        setTimeout(function() { history.go(0); }, 3000);
    }
    function applyProfile(profileName) {
        $script.ready('om-target', function() {
            OmegaTargetPopup.applyProfile(profileName, closePopup);
        });
    }
}).call(this);

(function() {
    $(document).ready(function() {
        $("#onoffswitch").on('click', function () {
            clickSwitch();
        });

        var clickSwitch = function () {
            if ($("#onoffswitch").is(':checked')) {
                setTimeout(function(){OmegaPopup.applyProfile('启用');},300);
            } else {
                setTimeout(function(){OmegaPopup.applyProfile("direct");},300);
            }
        };
    });
}).call(this);