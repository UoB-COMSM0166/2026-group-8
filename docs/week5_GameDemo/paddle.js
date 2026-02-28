// ============================================================
// Paddle.js  (p5.js 版本)
// ============================================================

class Paddle {
  constructor() {
    // 挡板尺寸
    this.w = 100;
    this.h = 12;

    // 初始位置：水平居中，靠近底部
    this.x = (width - this.w) / 2;
    this.y = height - 50;

    // 小球是否还附在挡板上（游戏开始前为 true）
    this.isBallAttached = true;
  }

  // 每帧更新：挡板跟随鼠标移动
  update() {
    // 让挡板中心对准鼠标 X
    this.x = mouseX - this.w / 2;

    // 限制挡板不超出左右边界
    this.x = constrain(this.x, 0, width - this.w);
  }

  // 发射小球（左键点击时由 mousePressed 调用）
  launchBall() {
    if (this.isBallAttached) {
      this.isBallAttached = false;
    }
  }

  // ── 计算小球碰到挡板后的反弹速度方向 
  // 碰左侧偏左弹，碰右侧偏右弹，碰中间垂直弹
  // 返回 { vx, vy }，已归一化
  calculateBounce(ballX) {
    // 碰撞点相对挡板中心的偏移，范围 -1 ~ 1
    const hitOffset = (ballX - (this.x + this.w / 2)) / (this.w / 2);

    // 最大反弹角度 75 度
    const maxAngle = radians(75);
    const angle    = hitOffset * maxAngle;

    return {
      vx:  sin(angle),   // 水平分量
      vy: -cos(angle),   // 垂直分量（向上为负）
    };
  }

  //延长挡板（LongPaddle 道具效果)
  extend(amount) {
    this.w += amount;
    // 延长后确保不超出右边界
    this.x = constrain(this.x, 0, width - this.w);
  }

  //获取边界矩形（供 GameEngine 碰撞检测使用）
  getBounds() {
    return {
      left:   this.x,
      right:  this.x + this.w,
      top:    this.y,
      bottom: this.y + this.h,
    };
  }

  // 渲染挡板
  draw() {
    push();

    // 挡板主体
    fill('#4A90D9');
    noStroke();
    rect(this.x, this.y, this.w, this.h, 6); // 最后一个参数是圆角半径

    // 高光（增加立体感）
    fill(255, 255, 255, 80);
    rect(this.x + 4, this.y + 2, this.w - 8, 4, 3);

    pop();
  }
}