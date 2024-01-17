!(function (p) {
    (p.fn.appear = function (r, e) {
        var d = p.extend({ data: void 0, one: !0, accX: 0, accY: 0 }, e);
        return this.each(function () {
            var l = p(this);
            if (((l.appeared = !1), r)) {
                var h = p(window),
                    a = function () {
                        if (l.is(":visible")) {
                            var e = h.scrollLeft(),
                                a = h.scrollTop(),
                                r = l.offset(),
                                p = r.left,
                                n = r.top,
                                t = d.accX,
                                c = d.accY,
                                i = l.height(),
                                o = h.height(),
                                f = l.width(),
                                s = h.width();
                            a <= n + i + c &&
                            n <= a + o + c &&
                            e <= p + f + t &&
                            p <= e + s + t
                                ? l.appeared || l.trigger("appear", d.data)
                                : (l.appeared = !1);
                        } else l.appeared = !1;
                    },
                    e = function () {
                        if (((l.appeared = !0), d.one)) {
                            h.unbind("scroll", a);
                            var e = p.inArray(a, p.fn.appear.checks);
                            0 <= e && p.fn.appear.checks.splice(e, 1);
                        }
                        r.apply(this, arguments);
                    };
                d.one
                    ? l.one("appear", d.data, e)
                    : l.bind("appear", d.data, e),
                    h.scroll(a),
                    p.fn.appear.checks.push(a),
                    a();
            } else l.trigger("appear", d.data);
        });
    }),
        p.extend(p.fn.appear, {
            checks: [],
            timeout: null,
            checkAll: function () {
                var e = p.fn.appear.checks.length;
                if (0 < e) for (; e--; ) p.fn.appear.checks[e]();
            },
            run: function () {
                p.fn.appear.timeout && clearTimeout(p.fn.appear.timeout),
                    (p.fn.appear.timeout = setTimeout(
                        p.fn.appear.checkAll,
                        20
                    ));
            },
        }),
        p.each(
            [
                "append",
                "prepend",
                "after",
                "before",
                "attr",
                "removeAttr",
                "addClass",
                "removeClass",
                "toggleClass",
                "remove",
                "css",
                "show",
                "hide",
            ],
            function (e, a) {
                var r = p.fn[a];
                r &&
                    (p.fn[a] = function () {
                        var e = r.apply(this, arguments);
                        return p.fn.appear.run(), e;
                    });
            }
        );
})(jQuery);
