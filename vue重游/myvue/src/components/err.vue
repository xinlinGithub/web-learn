<template>
        <div class="err">
            {{ msg }}
        </div>
    </template>
    
    <script>
    
        export default {
            data(){
                return {
                    msg: '你进入了一片404区域！！！'
                }
            }
        }
    </script>
    
    <style scoped lang="less">
        .err{
            font-size: 20px;
            color: black;
        }
    </style>