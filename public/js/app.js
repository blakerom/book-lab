'use strict';

$('#showForm').on('click', function() {
  $('#update-details').toggle();
  if($('#showForm').text() === 'Cancel'){
    $('#showForm').text('Modify Book');
  }
  else if ($('#showForm').text() === 'Modify Book'){
    $('#showForm').text('Cancel');
  }
});
