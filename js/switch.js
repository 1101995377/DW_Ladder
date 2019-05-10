(function() {
    $(document).ready(function() {
        $("#onoffswitch").on('click', function () {
            clickSwitch();
        });

        var clickSwitch = function () {
            if ($("#onoffswitch").is(':checked')) {
                setTimeout(function(){OmegaPopup.applyProfile('启用');},500);
                console.log("在ON的状态下");
            } else {
                setTimeout(function(){OmegaPopup.applyProfile("direct");},500);
                console.log("在OFF的状态下");
            }
        };
    });
}).call(this);