import './asset/css/base.less'

$.get('/api/comments/hotflow',
    {
        id: '4354219798584471',
        mid: '4354219798584471',
        max_id_type: 0
    },
    function (data) { 
        console.log(data,'data')
    }
)

$.get('/api/msg/index',
    {
        format: 'cards'
    },
    function (data) {
        console.log(data,'index')
    }
)