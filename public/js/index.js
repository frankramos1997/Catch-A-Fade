$(document).ready(function() {
  $(function() {
    $('#datepicker')
      .datepicker({
        autoclose: true,
        todayHighlight: true,
      })
      .datepicker('update', new Date());
  });
});
