import { Component, OnInit } from '@angular/core';
declare var jQuery: any;
@Component({
  selector: 'app-game-page',
  templateUrl: './game-page.component.html',
  styleUrls: ['./game-page.component.scss'],
})
export class GamePageComponent implements OnInit {
  player1Score: any;
  player2Score: any;
  constructor() {}

  ngOnInit(): void {
    this.entire();
  }
  entire() {
    var anim_id: number;

    var container: any = jQuery('#container');
    var ball: any = jQuery('#ball');
    var paddle: any = jQuery('.paddle');
    var paddle_1: any = jQuery('#paddle_1');
    var paddle_2: any = jQuery('#paddle_2');
    var restart_div: any = jQuery('#restart_div');
    var restart_btn: any = jQuery('#restart');
    var winner: any = jQuery('#winner');

    var container_width: any = parseInt(container.width());
    var container_height: any = parseInt(container.height());
    var paddle_width: any = parseInt(paddle.width());
    var ball_height: any = parseInt(ball.height());
    var ball_width: any = parseInt(ball.width());

    var game_over: any = false;

    var ball_center: number;
    var paddle_center: number;

    var ball_go: any = 'down';
    var ball_right_left: any = 'right';

    var top: any = 6;
    var right_left_angle: number = 0;

    var move_right_p1: any = false;
    var move_left_p1: any = false;

    var move_right_p2: any = false;
    var move_left_p2: any = false;

    var who_won: any;

    //paddle controls

    jQuery(document).on('keydown', function (e: { keyCode: any }) {
      if (game_over === false) {
        var key: any = e.keyCode;
        if (key === 37 && move_left_p1 === false) {
          move_left_p1 = requestAnimationFrame(left_p1);
        } else if (key === 39 && move_right_p1 === false) {
          move_right_p1 = requestAnimationFrame(right_p1);
        } else if (key === 65 && move_left_p2 === false) {
          move_left_p2 = requestAnimationFrame(left_p2);
        } else if (key === 83 && move_right_p2 === false) {
          move_right_p2 = requestAnimationFrame(right_p2);
        }
      }
    });

    jQuery(document).on('keyup', function (e: { keyCode: any }) {
      var key: any = e.keyCode;
      if (key === 37) {
        cancelAnimationFrame(move_left_p1);
        move_left_p1 = false;
      } else if (key === 39) {
        cancelAnimationFrame(move_right_p1);
        move_right_p1 = false;
      } else if (key === 65) {
        cancelAnimationFrame(move_left_p2);
        move_left_p2 = false;
      } else if (key === 83) {
        cancelAnimationFrame(move_right_p2);
        move_right_p2 = false;
      }
    });

    function left_p1() {
      if (parseInt(paddle_1.css('left')) > 0) {
        paddle_1.css('left', parseInt(paddle_1.css('left')) - 15);
        move_left_p1 = requestAnimationFrame(left_p1);
        console.log(move_left_p1);
      }
    }

    function right_p1() {
      if (parseInt(paddle_1.css('left')) < container_width - paddle_width) {
        paddle_1.css('left', parseInt(paddle_1.css('left')) + 15);
        move_right_p1 = requestAnimationFrame(right_p1);
        console.log(move_right_p1);
      }
    }

    function left_p2() {
      if (parseInt(paddle_2.css('left')) > 0) {
        paddle_2.css('left', parseInt(paddle_2.css('left')) - 15);
        move_left_p2 = requestAnimationFrame(left_p2);
      }
    }

    function right_p2() {
      if (parseInt(paddle_2.css('left')) < container_width - paddle_width) {
        paddle_2.css('left', parseInt(paddle_2.css('left')) + 15);
        move_right_p2 = requestAnimationFrame(right_p2);
      }
    }

    //ball controls

    anim_id = requestAnimationFrame(repeat);

    function repeat(this: any) {
      if (game_over === false) {
        if (collision(ball, paddle_1)) {
          ball_center = parseInt(ball.css('left')) + ball_width / 2;
          paddle_center = parseInt(paddle_1.css('left')) + paddle_width / 2;
          ball_right_left = ball_center > paddle_center ? 'right' : 'left';
          right_left_angle = parseInt(
            Math.abs(paddle_center - ball_center) / 6 + ''
          );
          ball_go = 'up';
        } else if (collision(ball, paddle_2)) {
          ball_center = parseInt(ball.css('left')) + ball_width / 2;
          paddle_center = parseInt(paddle_2.css('left')) + paddle_width / 2;
          ball_right_left = ball_center > paddle_center ? 'right' : 'left';
          right_left_angle = parseInt(
            Math.abs(paddle_center - ball_center) / 6 + ''
          );
          ball_go = 'down';
        } else if (parseInt(ball.css('left')) <= 0) {
          ball_right_left = 'right';
        } else if (parseInt(ball.css('left')) >= container_width - ball_width) {
          ball_right_left = 'left';
        } else if (parseInt(ball.css('top')) <= 0) {
          who_won = 'Player 1';
          // stop_the_game();
          // this.player1Score += 1;
          ball_go = 'down';
        } else if (
          parseInt(ball.css('top')) >=
          container_height - ball_height
        ) {
          who_won = 'Player 2';
          // stop_the_game();                                   <---------- here
          ball_go = 'center';
          // this.player2Score += 1;
        }

        if (ball_go === 'down') {
          ball_down();
        } else {
          ball_up();
        }

        anim_id = requestAnimationFrame(repeat);
      }
    }

    function ball_down() {
      ball.css('top', parseInt(ball.css('top')) + top);
      if (ball_right_left === 'right') {
        ball.css('left', parseInt(ball.css('left')) + right_left_angle);
      } else {
        ball.css('left', parseInt(ball.css('left')) - right_left_angle);
      }
    }

    function ball_up() {
      ball.css('top', parseInt(ball.css('top')) - top);
      if (ball_right_left === 'right') {
        ball.css('left', parseInt(ball.css('left')) + right_left_angle);
      } else {
        ball.css('left', parseInt(ball.css('left')) - right_left_angle);
      }
    }

    function stop_the_game() {
      game_over = true;
      cancelAnimationFrame(anim_id);
      winner.text(who_won + ' won the game ');
      restart_div.slideDown();
    }

    restart_btn.click(function () {
      location.reload();
    });

    function collision(
      $div1: {
        offset: () => { (): any; new (): any; left: any; top: any };
        outerHeight: (arg0: boolean) => any;
        outerWidth: (arg0: boolean) => any;
      },
      $div2: {
        offset: () => { (): any; new (): any; left: any; top: any };
        outerHeight: (arg0: boolean) => any;
        outerWidth: (arg0: boolean) => any;
      }
    ) {
      var x1: any = $div1.offset().left;
      var y1: any = $div1.offset().top;
      var h1: any = $div1.outerHeight(true);
      var w1: any = $div1.outerWidth(true);
      var b1: any = y1 + h1;
      var r1: any = x1 + w1;
      var x2: any = $div2.offset().left;
      var y2: any = $div2.offset().top;
      var h2: any = $div2.outerHeight(true);
      var w2: any = $div2.outerWidth(true);
      var b2: any = y2 + h2;
      var r2: any = x2 + w2;

      if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2) return false;
      return true;
    }
  }
}
