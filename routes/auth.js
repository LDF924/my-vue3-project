const express = require('express');
const router = express.Router();

// 1.1 登录 (Login)
router.post('/login', (req, res) => {
    const { type, username, password, captcha, contact, verifyCode } = req.body;
    // 实际业务逻辑：验证用户身份
    if ((type === 'account' && username === 'user123' && password === 'password123' && captcha === 'abc123') ||
        (type === 'code' && contact === 'user@example.com' && verifyCode === '654321')) {
        res.json({
            code: 200,
            message: '登录成功',
            data: {
                token: 'your_auth_token',
                user: {
                    id: 1,
                    username: username || (type === 'code' ? 'code_user' : 'user123'),
                    avatar: 'https://example.com/avatar.jpg',
                    role: 'farmer'
                }
            }
        });
    } else {
        res.status(401).json({
            code: 401,
            message: '用户名或密码错误',
            data: null
        });
    }
});

// 1.2 退出登录 (Logout)
router.post('/logout', (req, res) => {
    // 实际业务逻辑：清除用户会话或 token
    res.json({
        code: 200,
        message: '退出成功',
        data: null
    });
});

// 1.3 获取图形验证码 (Get Captcha)
router.get('/captcha', (req, res) => {
    // 实际业务逻辑：生成图形验证码并返回
    res.json({
        code: 200,
        message: '获取成功',
        data: {
            captchaImage: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUg...', // 示例 Base64 图片数据
            captchaId: 'unique_captcha_id' // 用于后续验证的ID
        }
    });
});

// 1.4 发送验证码 (Send Verification Code)
router.post('/sendCode', (req, res) => {
    const { contact, type } = req.body;
    // 实际业务逻辑：向手机号或邮箱发送验证码
    res.json({
        code: 200,
        message: '验证码已发送',
        data: null
    });
});

// 2.1 用户注册 (Register)
router.post('/register', (req, res) => {
    const { username, password, contact, verifyCode, userType } = req.body;
    // 实际业务逻辑：注册新用户
    if (username && password && contact && verifyCode === '123456' && userType) {
        res.json({
            code: 200,
            message: '注册成功',
            data: {
                userId: 101,
                username: username
            }
        });
    } else {
        res.status(400).json({
            code: 400,
            message: '注册失败，该用户名/手机号/邮箱已存在或验证码错误',
            data: null
        });
    }
});

// 30.4 忘记密码 (Forgot Password)
router.post('/forgot-password', (req, res) => {
    const { contact } = req.body;
    res.json({
        code: 200,
        message: '重置密码链接已发送至您的邮箱/手机',
        data: null
    });
});

module.exports = router; 