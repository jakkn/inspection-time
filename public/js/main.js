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
    $labelTotal = $("#label-total"),
    $slider = $("#slider"),
    $sliderLabel = $("#slider-label"),
    $nameField = $("#inputfield-name");
  var activeDirection = "left",
    correct = 0,
    wrong = 0,
    total = 0,
    activeInterval = 150;

  $btnLeft.on("click", {side: "left"}, handleClick);
  $btnRight.on("click", {side: "right"}, handleClick);
  $slider.on("input", function () {
    $sliderLabel.text(this.value + "ms");
    activeInterval = this.value;
  });

  function handleClick(e) {
    total++;
    const interval = parseInt(activeInterval),
      name = ($nameField.val() === "" ? "test" : $nameField.val());
    if (e.data.side === activeDirection) {
      correct++;
      updateServerStats({user: name, successful: true, activeInterval: activeInterval});
      $slider.val(interval - 1).trigger("input");
    }
    else {
      wrong++;
      updateServerStats({user: name, successful: false, activeInterval: activeInterval});
      $slider.val(interval + 1).trigger("input");
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

    setTimeout(displayImage, activeInterval, maskImage);
  }

  function displayImage(image) {
    $img.attr("src", image);
  }

}();
