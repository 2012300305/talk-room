<template>
 <div id="login">
        <div class="login-container">
            <el-form :model="formItem" :rules="rules2"
             status-icon
             ref="formItem" 
             label-position="left" 
             label-width="0px" 
             class="demo-ruleForm login-page">
                <h3 class="title">员工定会议室系统登录</h3>
                <el-form-item prop="account">
                    <el-input type="text" 
                        v-model="formItem.account" 
                        auto-complete="off" 
                        placeholder="用户名"
                    ></el-input>
                </el-form-item>
                    <el-form-item prop="password">
                        <el-input type="password" 
                            v-model="formItem.password" 
                            auto-complete="off" 
                            placeholder="密码"
                        ></el-input>
                    </el-form-item>
    
                <el-checkbox 
                    v-model="checked"
                    class="rememberme"
                >记住密码</el-checkbox>
                <el-form-item style="width:100%;">
                    <el-button type="primary" style="width:100%;" @click="submit" :loading="logining">登录</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
  <style scoped>
    .login-container {
        width: 100%;
        height: 100%;
    }
    .login-page {
        -webkit-border-radius: 5px;
        border-radius: 5px;
        margin: 180px auto;
        width: 350px;
        padding: 35px 35px 15px;
        background: #fff;
        border: 1px solid #eaeaea;
        box-shadow: 0 0 25px #cac6c6;
    }
    label.el-checkbox.rememberme {
        margin: 0px 0px 15px;
        text-align: left;
    }
</style>
  <script>
   export default {
      name: 'login',
      data(){
          return{
        logining: false,
            formItem: {
                account: '',
                password: '',
            },
            rules2: {
                username: [{required: true, message: 'please enter your account', trigger: 'blur'}],
                password: [{required: true, message: 'enter your password', trigger: 'blur'}]
            },
            checked: false
      }
      },
      methods:{
        submit:function(){      
        var that = this;
        that.$router.push({path: '/index'});
        axios.post(that.GLOBAL.serverPath+"/login",JSON.stringify(this.formItem)).then(function (response) {
                if(0==response.data.code){
                    //  localStorage.setItem("Token", "Bearer "+response.data.data.Authorization);
                    //  localStorage.setItem("RoleId", response.data.data.RoleId);                    
                    // that.$router.push({path: '/index'})
                }else{
                    alert(response.data.msg);
                }
        })
        .catch(function (error) {
             alert(error);
        });

        
          }
      }
    }


  </script>