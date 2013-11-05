module("Mouse Navigation 2012",{setup:function(){this.input=$('<input type="text" value="31-03-2012">').appendTo("#qunit-fixture").datepicker({format:"dd-mm-yyyy"}).focus(),this.dp=this.input.data("datepicker"),this.picker=this.dp.picker},teardown:function(){this.picker.remove()}}),test("Selecting date resets viewDate and date",function(){var e;equal(this.dp.viewMode,0),e=this.picker.find(".datepicker-days tbody td:nth(7)"),equal(e.text(),"4"),e.click(),datesEqual(this.dp.viewDate,UTCDate(2012,2,4)),datesEqual(this.dp.date,UTCDate(2012,2,4)),e=this.picker.find(".datepicker-days tbody td:first"),equal(e.text(),"26")}),test("Navigating next/prev by month",function(){var e;equal(this.dp.viewMode,0),e=this.picker.find(".datepicker-days thead th.prev"),ok(e.is(":visible"),"Month:prev nav is visible"),e.click(),datesEqual(this.dp.viewDate,UTCDate(2012,1,29)),datesEqual(this.dp.date,UTCDate(2012,2,31)),e=this.picker.find(".datepicker-days tbody td:first"),equal(e.text(),"29"),e=this.picker.find(".datepicker-days thead th.next"),ok(e.is(":visible"),"Month:next nav is visible"),e.click().click(),datesEqual(this.dp.viewDate,UTCDate(2012,3,29)),datesEqual(this.dp.date,UTCDate(2012,2,31)),e=this.picker.find(".datepicker-days tbody td:first"),equal(e.text(),"25")}),test("Navigating to/from year view",function(){var e;equal(this.dp.viewMode,0),e=this.picker.find(".datepicker-days thead th.switch"),ok(e.is(":visible"),"View switcher is visible"),e.click(),ok(this.picker.find(".datepicker-months").is(":visible"),"Month picker is visible"),equal(this.dp.viewMode,1),datesEqual(this.dp.viewDate,UTCDate(2012,2,31)),datesEqual(this.dp.date,UTCDate(2012,2,31)),e=this.picker.find(".datepicker-months tbody span:contains(Apr)"),e.click(),equal(this.dp.viewMode,0),datesEqual(this.dp.viewDate,UTCDate(2012,3,1)),datesEqual(this.dp.date,UTCDate(2012,2,31))}),test("Navigating to/from decade view",function(){var e;equal(this.dp.viewMode,0),e=this.picker.find(".datepicker-days thead th.switch"),ok(e.is(":visible"),"View switcher is visible"),e.click(),ok(this.picker.find(".datepicker-months").is(":visible"),"Month picker is visible"),equal(this.dp.viewMode,1),datesEqual(this.dp.viewDate,UTCDate(2012,2,31)),datesEqual(this.dp.date,UTCDate(2012,2,31)),e=this.picker.find(".datepicker-months thead th.switch"),ok(e.is(":visible"),"View switcher is visible"),e.click(),ok(this.picker.find(".datepicker-years").is(":visible"),"Year picker is visible"),equal(this.dp.viewMode,2),datesEqual(this.dp.viewDate,UTCDate(2012,2,31)),datesEqual(this.dp.date,UTCDate(2012,2,31)),e=this.picker.find(".datepicker-years tbody span:contains(2011)"),e.click(),equal(this.dp.viewMode,1),datesEqual(this.dp.viewDate,UTCDate(2011,2,1)),datesEqual(this.dp.date,UTCDate(2012,2,31)),e=this.picker.find(".datepicker-months tbody span:contains(Apr)"),e.click(),equal(this.dp.viewMode,0),datesEqual(this.dp.viewDate,UTCDate(2011,3,1)),datesEqual(this.dp.date,UTCDate(2012,2,31))}),test("Navigating prev/next in year view",function(){var e;equal(this.dp.viewMode,0),e=this.picker.find(".datepicker-days thead th.switch"),ok(e.is(":visible"),"View switcher is visible"),e.click(),ok(this.picker.find(".datepicker-months").is(":visible"),"Month picker is visible"),equal(this.dp.viewMode,1),equal(this.picker.find(".datepicker-months thead th.switch").text(),"2012"),datesEqual(this.dp.viewDate,UTCDate(2012,2,31)),datesEqual(this.dp.date,UTCDate(2012,2,31)),e=this.picker.find(".datepicker-months thead th.next"),e.click(),equal(this.picker.find(".datepicker-months thead th.switch").text(),"2013"),datesEqual(this.dp.viewDate,UTCDate(2013,2,31)),datesEqual(this.dp.date,UTCDate(2012,2,31)),e=this.picker.find(".datepicker-months thead th.prev"),e.click().click(),equal(this.picker.find(".datepicker-months thead th.switch").text(),"2011"),datesEqual(this.dp.viewDate,UTCDate(2011,2,31)),datesEqual(this.dp.date,UTCDate(2012,2,31))}),test("Navigating prev/next in decade view",function(){var e;equal(this.dp.viewMode,0),e=this.picker.find(".datepicker-days thead th.switch"),ok(e.is(":visible"),"View switcher is visible"),e.click(),ok(this.picker.find(".datepicker-months").is(":visible"),"Month picker is visible"),equal(this.dp.viewMode,1),datesEqual(this.dp.viewDate,UTCDate(2012,2,31)),datesEqual(this.dp.date,UTCDate(2012,2,31)),e=this.picker.find(".datepicker-months thead th.switch"),ok(e.is(":visible"),"View switcher is visible"),e.click(),ok(this.picker.find(".datepicker-years").is(":visible"),"Year picker is visible"),equal(this.dp.viewMode,2),equal(this.picker.find(".datepicker-years thead th.switch").text(),"2010-2019"),datesEqual(this.dp.viewDate,UTCDate(2012,2,31)),datesEqual(this.dp.date,UTCDate(2012,2,31)),e=this.picker.find(".datepicker-years thead th.next"),e.click(),equal(this.picker.find(".datepicker-years thead th.switch").text(),"2020-2029"),datesEqual(this.dp.viewDate,UTCDate(2022,2,31)),datesEqual(this.dp.date,UTCDate(2012,2,31)),e=this.picker.find(".datepicker-years thead th.prev"),e.click().click(),equal(this.picker.find(".datepicker-years thead th.switch").text(),"2000-2009"),datesEqual(this.dp.viewDate,UTCDate(2002,2,31)),datesEqual(this.dp.date,UTCDate(2012,2,31))}),test("Selecting date from previous month resets viewDate and date, changing month displayed",function(){var e;equal(this.dp.viewMode,0),e=this.picker.find(".datepicker-days tbody td:first"),equal(e.text(),"26"),equal(this.picker.find(".datepicker-days thead th.switch").text(),"March 2012"),e.click(),equal(this.picker.find(".datepicker-days thead th.switch").text(),"February 2012"),datesEqual(this.dp.viewDate,UTCDate(2012,1,26)),datesEqual(this.dp.date,UTCDate(2012,1,26)),e=this.picker.find(".datepicker-days tbody td:first"),equal(e.text(),"29")}),test("Selecting date from next month resets viewDate and date, changing month displayed",function(){var e;this.input.val("01-04-2012"),this.dp.update(),equal(this.dp.viewMode,0),e=this.picker.find(".datepicker-days tbody td:last"),equal(e.text(),"5"),equal(this.picker.find(".datepicker-days thead th.switch").text(),"April 2012"),e.click(),equal(this.picker.find(".datepicker-days thead th.switch").text(),"May 2012"),datesEqual(this.dp.viewDate,UTCDate(2012,4,5)),datesEqual(this.dp.date,UTCDate(2012,4,5)),e=this.picker.find(".datepicker-days tbody td:first"),equal(e.text(),"29")});