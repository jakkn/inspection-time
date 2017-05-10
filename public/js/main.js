'use strict';
var InspectionTime = function () {
  const $img = $("#flashing-image"),
    $btnLeft = $("#btn-left"),
    $btnRight = $("#btn-right"),
    leftImage = "img/inspection-time-left.jpg",
    rightImage = "img/inspection-time-right.jpg",
    maskImage = "img/inspection-time-mask.jpg",
    $labelCorrect = $("#label-correct"),
    $labelWrong = $("#label-wrong"),
    $labelTotal = $("#label-total");
  var activeDirection = "left",
    correct = 0,
    wrong = 0,
    total = 0;

  $btnLeft.on("click", {side: "left"}, handleClick);
  $btnRight.on("click", {side: "right"}, handleClick);

  function handleClick(e) {
    total++;
    if (e.data.side === activeDirection) {
      correct++;
      updateServerStats({number: "correct"});
    }
    else {
      wrong++;
      updateServerStats({number: "wrong"});
    }

    updateStats();
    displayNewImage();
  }

  function updateServerStats(data) {
    $.ajax({
      type: "POST",
      url: "/logresults",
      data: data
    }).done(function () {
    });
  }

  function updateStats() {
    $labelCorrect.text(correct);
    $labelWrong.text(wrong);
    $labelTotal.text(total);
  }

  function displayNewImage() {
    if (Math.floor(Math.random() * 2) > 0) {
      activeDirection = "right";
      displayImage(rightImage);
    }
    else {
      activeDirection = "left";
      displayImage(leftImage);
    }

    setTimeout(displayImage, 300, maskImage);
  }

  function displayImage(image) {
    $img.attr("src", image);
  }

}();
