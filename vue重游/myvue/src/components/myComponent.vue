<template>
    <div class="wrap">
        <div class="top">
            <ul class="left">
                <li>
                    <a href="#">文档</a>
                </li>
                <li>
                    <a href="#">API</a>
                </li>
                <li>
                    <a href="#">教程</a>
                </li>
                <li>
                    <a href="#">关注</a>
                </li>
                <li>
                    <a href="#">点我了解</a>
                </li>
            </ul>
            <ul class="right">
                <li>
                    <a href="#">登录</a>
                </li>
                <li>
                    <a href="#">注册</a>
                </li>
                <li>
                    <a href="#">关于我们</a>
                </li>
            </ul>
        </div>
        <p>{{ msg }}</p>        
    </div>
</template>

<script>
    export default {
        data(){
            return {
                msg: 'this is vue！'                
            }
        }
    }
</script>

<style scoped lang="less">
    @width: 10px;
    @height: @width + 10px;
    .borderRight{
        border-right: 1px solid orchid;
    }
    .none{
        a{
            border: none;
        }
    }
    .wrap{
        li{
            display: inline-block;
            padding: 8px 0px;
            margin: 0;
            a{
                font-size: 16px;                
                .borderRight();
                padding: 0 12px;
            }
        }
        @media (max-width: 600px) {
            .top{
                .left{
                    display: none;
                }
                .right{
                    margin-right: 50%;
                    transform: translateX(50%);
                    @media (max-width: 400px) {
                        li:nth-of-type(3){
                            display: none;
                        }
                        li:nth-of-type(2) a{
                            border: none;
                        }
                    }
                }
            }
        }
        .top{
            .left{
                float: left;
                li:last-child{
                    .none();
                }
            }
            .right{
                float: right;
                li:last-child{
                    .none();
                }
            }
            &::after{
                content: '';
                display: block;
                height: 0;
                font-size: 0;
                clear: both;
            }
        }
        p{
            font-size: 20px;
            border-top: 1px solid orange;
            margin-top: 10px;
            @media (min-width:500px) {
                font-size: 30px;
                font-weight: 600;
                text-align: center;
                color: #677889;
            }
        }
    }
</style>