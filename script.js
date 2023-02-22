const noise = new Audio("sounds/noise.mp3");
const goal = new Audio("sounds/goal.mp3");
goal.volume = 0.5;

let blueScore = 0;
let redScore = 0;
let redBegin = 0;

const viewScore = () => {
  if (blueScore > 9 || redScore > 9) {
    $(".tab").html(`
  <span class="blueSmall">${blueScore}</span> : <span class="redSmall">${redScore}</span>
  `);
  } else {
    $(".tab").html(`
<span class="blue">${blueScore}</span> : <span class="red">${redScore}</span>
`);
  }
};

viewScore(blueScore, redScore);

const shot = () => {
  let ballX,
    field = $(".field").width() - $(".ball").width(),
    position = $(".ball").position();

  if (position.left == field || redBegin == 1) {
    ballX = 0;
  } else {
    ballX = field;
  }

  redBegin = 0;

  let ballY =
    0 +
    Math.floor(Math.random() * ($(".field").height() - $(".ball").height()));

  $(".ball").animate(
    {
      left: ballX,
      top: ballY,
    },
    500,
    function () {
      (position = $(".ball").position()), console.log(position);

      if (position.top >= 233 && position.top <= 423 && position.left == 0) {
        goal.play();
        $(".redRectangle").show();
        setTimeout(function () {
          $(".redRectangle").hide();
        }, 3000);
        redScore++;
        console.log(blueScore + " : " + redScore);
        $(".ball").css({
          top: "43%",
          left: "46.1%",
        });
      }

      if (
        position.top >= 233 &&
        position.top <= 423 &&
        position.left == field
      ) {
        goal.play();
        $(".blueRectangle").show();
        setTimeout(function () {
          $(".blueRectangle").hide();
        }, 3000);
        blueScore++;
        $(".ball").css({
          top: "43%",
          left: "46.1%",
        });
        redBegin = 1;
      }
      viewScore(blueScore, redScore);
    }
  );
};

$(".ball").on("click", () => {
  noise.play();
  shot();
});
