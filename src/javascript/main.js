(function () {
    var gl = gl || {};

    /**
     * Loads page via agax
     * @private
     * @param {jQuery} $posts - element of posts list
     */
    gl.posts = function ($posts) {
        var $btn = $('<a></a>'),
            postsPerView = 3,
            showing = 0,
            total = Math.floor($posts.find('.post').length / postsPerView);

        if (total < postsPerView) {
            return;
        }

        /**
         * Loads more article links
         * @private
         * @param {Event} e - click event
         */
        function loadMore (e) {
            e.preventDefault();
            var $newPosts;
            console.log(showing + '/' + total)
            if (showing < total) {
                showing++;
                $newPosts = $posts.find('.post-' + showing);
                $newPosts.each(function(i) {
                    var wait = i * 300;
                    $newPosts.eq(i).addClass('show-post');
                    setTimeout(function () {
                        $newPosts.eq(i).addClass('fade-in-post');
                    }, wait);
                });
                if (showing === total) {
                    $btn.addClass('hide');
                }
            }
        }

        $btn.text('Show older posts')
            .addClass('btn load-more')
            .insertAfter($posts)
            .on('click', loadMore);
    }

    gl.init = function () {
        var $posts = $('.posts');
        if ($posts.length) {
            gl.posts($posts);
        }
    }

    gl.init();


})();