function ready(fn) {
    if (document.readyState != 'loading') {
        fn();
    } else {
        document.addEventListener('DOMContentLoaded', fn);
    }
}

if (screen.width >= 720) {
    //avoid loading jquery on mobile
    document.write('<script src="./js/jquery-2.2.4.min.js"><\/script>');
    document.write('<script src="./js/jquery.scrollify.min.js"><\/script>');
}

ready(function() {
    if (screen.width >= 720 && $) {
        $.scrollify({
            section: ".section",
            scrollSpeed: 900
        });
        var n = 0;
        $("nav ul a").each(function() {
            if(this.id !== 'imprintLink'){
                var i = n++;
                $(this).click(function(e) {
                    e.preventDefault()
                    $.scrollify.move(i);
                });
            }
        });
    } else {
        var smallNavigation = function() {

            var mobileMenuVisible = false;
            var menu = document.getElementById('menu');

            return {
                clickMainButton: function() {
                    if (menu) {
                        if (mobileMenuVisible) {
                            mobileMenuVisible = false;
                            menu.style.display = 'none';
                        } else {
                            mobileMenuVisible = true;
                            menu.style.display = 'inline';
                        }
                    }
                },
                clickItem: function() {
                    mobileMenuVisible = false;
                    menu.style.display = 'none';
                    return true;
                }
            };
        }();

        var smallnavButton = document.getElementById('smallnavButton');
        smallnavButton.onclick = smallNavigation.clickMainButton;
        var elements = document.querySelectorAll('#menu li');
        Array.prototype.forEach.call(elements, function(el, i) {
            el.onclick = smallNavigation.clickItem;
        });
    }
});
