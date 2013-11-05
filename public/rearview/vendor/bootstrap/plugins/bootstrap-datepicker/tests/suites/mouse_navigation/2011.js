module("Mouse Navigation 2011",{setup:function(){this.input=$('<input type="text" value="31-03-2011">').appendTo("#qunit-fixture").datepicker({format:"dd-mm-yyyy"}).focus(),this.dp=this.input.data("datepicker"),this.picker=this.dp.picker},teardown:function(){this.picker.remove()}}),test("Selecting date from previous month while in January changes month and year displayed",function(){var t;this.input.val("01-01-2011"),this.dp.update(),datesEqual(this.dp.viewDate,UTCDate(2011,0,1)),datesEqual(this.dp.date,UTCDate(2011,0,1)),equal(this.dp.viewMode,0),t=this.picker.find(".datepicker-days tbody td:first"),equal(t.text(),"26"),equal(this.picker.find(".datepicker-days thead th.switch").text(),"January 2011"),t.click(),equal(this.picker.find(".datepicker-days thead th.switch").text(),"December 2010"),datesEqual(this.dp.viewDate,UTCDate(2010,11,26)),datesEqual(this.dp.date,UTCDate(2010,11,26)),t=this.picker.find(".datepicker-days tbody td:first"),equal(t.text(),"28")}),test("Selecting date from next month while in December changes month and year displayed",function(){var t;this.input.val("01-12-2010"),this.dp.update(),datesEqual(this.dp.viewDate,UTCDate(2010,11,1)),datesEqual(this.dp.date,UTCDate(2010,11,1)),equal(this.dp.viewMode,0),t=this.picker.find(".datepicker-days tbody td:last"),equal(t.text(),"8"),equal(this.picker.find(".datepicker-days thead th.switch").text(),"December 2010"),t.click(),equal(this.picker.find(".datepicker-days thead th.switch").text(),"January 2011"),datesEqual(this.dp.viewDate,UTCDate(2011,0,8)),datesEqual(this.dp.date,UTCDate(2011,0,8)),t=this.picker.find(".datepicker-days tbody td:first"),equal(t.text(),"26")});