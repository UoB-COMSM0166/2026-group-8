/*
Ball Part
存储位置和速度
负责移动
负责和墙碰撞
负责和挡板碰撞（角度控制）
负责和砖块碰撞（真实物理反射）
*/
class Ball {

  // 创建一个小球
  constructor(x, y, r) {

    // 小球的位置（用向量表示）
    this.pos = createVector(x, y); // pos.x 是横坐标,pos.y 是纵坐标

    // 小球的速度（向量）
    this.vel = createVector(4, -4); // x 方向 4 表示向右, y 方向 -4 表示向上

    this.r = r; // 半径
  }


  // 每一帧更新(核心函数),会在draw()里面不断调用
  update(paddle, bricks) {
    this.pos.add(this.vel); // 位置 = 当前位置 + 速度
    this.checkWallCollision(); // 检查是否撞墙
    this.checkPaddleCollision(paddle); // 检查是否撞到挡板
    this.checkBrickCollision(bricks); // 检查是否撞到砖块
  }


  // 显示小球
  display() {
    circle(this.pos.x, this.pos.y, this.r * 2);
  }


  // 墙壁碰撞(左右墙+上墙,底部不处理,由Game判定失败）
  checkWallCollision() {

    // 撞到左墙
    if (this.pos.x - this.r < 0) {
      this.pos.x = this.r;        // 把球推回边界内
      this.vel.x *= -1;           // x 方向速度反向
    }

    // 撞到右墙
    if (this.pos.x + this.r > width) {
      this.pos.x = width - this.r;
      this.vel.x *= -1;
    }

    // 撞到上墙
    if (this.pos.y - this.r < 0) {
      this.pos.y = this.r;
      this.vel.y *= -1;
    }
    // 底部不处理,如果球掉出底部,由Game负责切换到GameOver状态
  }


  // 挡板碰撞,根据击中位置改变角度
  checkPaddleCollision(paddle) {

    /* 判断是否发生矩形碰撞
    条件：
    1. 球的 x 在挡板范围内
    2. 球的 y 接触到挡板
    3. 球是向下运动（避免重复触发）
    */
    if (
      this.pos.x > paddle.x &&
      this.pos.x < paddle.x + paddle.w &&
      this.pos.y + this.r > paddle.y &&
      this.pos.y - this.r < paddle.y + paddle.h &&
      this.vel.y > 0
    ) {
      // 计算击中挡板的位置
      let hitPos = // 计算球击中点相对于挡板中心的位置
        (this.pos.x - (paddle.x + paddle.w / 2)) 
        / (paddle.w / 2); //结果范围：-1 到 1 (-1 表示最左边; 0 表示中间; 1 表示最右边)
      let maxAngle = radians(60); // 最大反射角：60度
      let angle = hitPos * maxAngle; // 实际反射角
      let speed = this.vel.mag(); // 记录当前速度大小(只改变方向，不改变速度大小)

      // 根据角度重新计算速度
      this.vel.x = speed * sin(angle); // x用sin
      this.vel.y = -speed * cos(angle); //y用cos,且y要向上弹,所以取负号
    }
  }


  // 砖块碰撞（区分左右面/上下）
  // 使用 圆形 vs 矩形 碰撞检测
  checkBrickCollision(bricks) {

    // 遍历所有砖块
    for (let brick of bricks) {

      if (!brick.active) continue; // 如果砖块已经被打掉，跳过

      // 找到砖块中“离球最近的点”
      let closestX = constrain( // 把球的 x 限制在砖块左右之间
        this.pos.x,
        brick.x,
        brick.x + brick.w
      );
      let closestY = constrain( // 把球的 y 限制在砖块上下之间
        this.pos.y,
        brick.y,
        brick.y + brick.h
      );
      let dx = this.pos.x - closestX; // 计算球心到这个最近点的距离
      let dy = this.pos.y - closestY;
      let distanceSq = dx * dx + dy * dy;// 距离平方（不用开根号，效率更高）

      if (distanceSq < this.r * this.r) {  // 如果距离小于半径 → 碰撞

        brick.active = false;  // 砖块失效（被打掉）

        // 判断撞的是左右面还是上下
        if (abs(dx) > abs(dy)) { // 如果 x 方向穿透更大
          let normal = createVector( // 左右碰撞
            dx > 0 ? 1 : -1,
            0
          );
          this.reflect(normal);
        } else {
          let normal = createVector( // 上下碰撞
            0,
            dy > 0 ? 1 : -1
          );
          this.reflect(normal);
        }
        break; // 打到一个砖块就停止
      }
    }
  }

  /*
  物理反射公式: 入射角 = 反射角
  公式: v' = v - 2 (v·n) n
  v  = 原速度
  n  = 法向量
  v' = 反射后速度
  */
  reflect(normal) {
    normal.normalize(); // 确保法向量是单位向量
    let dot = this.vel.dot(normal); // 点积
    this.vel = p5.Vector.sub( // 反射公式
      this.vel,
      p5.Vector.mult(normal, 2 * dot)
    );
  }
}
