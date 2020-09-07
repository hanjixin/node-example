const express = require('express');

const router = express.Router();
const service = require('../service');

const upload = require('../service/upload')

router.get('/news', (req, res) => {
    let { page = 1, limit = 20, classId } = req.query;
    try {
        service.getList(page, limit, classId).then((data) => {
            res.send({
                code: 1,
                data,
            });
        });
    } catch (e) {
        res.send({
            code: -1,
            data: e,
        });
    }
});
router.post('/news', (req, res) => {
    console.log(req);
    const body = req.body;
    let classId = body.class_id || 9;
    // const body = {
    //     class_id: 9,
    //     title: '全国仅8个！慧科与常州大学的实验室建设项目入选“校企合作 双百计划”典型案例',
    //     title_pic: '/d/file/new/state/2020-07-02/0ad5d69da85aeca2640d54b84f071544.jpg',
    //     small_text:
    //         '为落实教育部推进产教融合、校企合作相关工作部署，促进高校教学改革，推动产教融合型企业建设，中国高等教育学会于2019年5月启动了中国高等教育博览会&ldquo;校企合作 双百计划&amp;',
    //     create_time: 1592478852,
    //     update_time: 0,
    //     content: '为落实教育部推进产教融合、校企合作相关工作部署，促进高校教学改革，推动产教融合型企业建设，中国高等教育学会于2019年5月启动了中国高等教育博览会'
    // };
    try {
        service.addNews(classId, body).then((data) => {
            res.send({
                code: 1,
                data,
            });
        });
    } catch (e) {
        console.log(e);
        res.send({
            code: -1,
            data: e,
        });
    }
});
router.put('/news/:id', (req, res) => {
    let { id } = req.params;
    const body = req.body;

    try {
        service.updateNews(id, body).then((data) => {
            res.send({
                code: 1,
                data,
            });
        });
    } catch (e) {
        res.send({
            code: -1,
            data: e,
        });
    }
});
router.delete('/news/:id', (req, res) => {
    let { id } = req.params;

    try {
        service.deleteNews(id).then((data) => {
            res.send({
                code: 1,
                data,
            });
        });
    } catch (e) {
        res.send({
            code: -1,
            data: e,
        });
    }
});
router.get('/news/:id', (req, res) => {
    let { id } = req.params;
    try {
        service.getNewsDetail(id).then((data) => {
            res.send({
                code: 1,
                data,
            });
        });
    } catch (e) {
        res.send({
            code: -1,
            data: e,
        });
    }
});
router.get('/articleList', (req, res) => {
    let { page = 1, limit = 20 } = req.query;
    try {
        service.getArticleList(page, limit).then((data) => {
            res.send({
                code: 1,
                data,
            });
        });
    } catch (e) {
        res.send({
            code: -1,
            data: e,
        });
    }
});

router.get('/hotnews', (req, res) => {
    let { id, classId = 9 } = req.query;
    try {
        service.getHotNews(id, classId).then((data) => {
            res.send({
                code: 1,
                data,
            });
        });
    } catch (e) {
        res.send({
            code: -1,
            data: e,
        });
    }
});

router.get('/getupload', upload.getAuth)

module.exports = router;
