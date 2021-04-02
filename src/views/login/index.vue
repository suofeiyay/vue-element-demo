<template>
  <div class="login-container">
    <el-form :model="loginForm" :rules="loginRules" ref="loginForm" class="login-form" label-width="80px">
      <div class="title-container">
        <h3 class="title">Login Form</h3>
      </div>
      <el-form-item label="用户名" prop="username">
        <el-input
          v-model="loginForm.username"
          placeholder="username"
          name="username"
          type="text"
          tabindex="1"
          autocomplete="on" 
        />
      </el-form-item>
      <el-form-item label="密码" prop="password">
       <el-input
          :key="passwordType"
          ref="password"
          v-model="loginForm.password"
          :type="passwordType"
          placeholder="password"
          name="password"
          tabindex="2"
          auto-complete="on"
          @keyup.enter.native="handleLogin"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon class="icon-el" :icon-class="passwordType === 'password' ? 'el-icon-tickets' : 'el-icon-printer'" />
        </span>
      </el-form-item>
      <el-form-item>
        <el-button
          :loading="loading"
          type="primary"
          style="width:100%;margin-bottom:30px;"
          @click.native.prevent="handleLogin"
        >Login</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { validUsername } from '@/utils/validate'
import SvgIcon from '@/components/SvgIcon'
export default {
  name: 'Login',
  components: {
    SvgIcon
  },
  data() {
    const validateusername = (rule, value, callback) => {
      if (!validUsername(value)) {
        callback(new Error('Please enter the correct user name'))
      } else {
        callback()
      }
    }
    const validatepassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('The password can not be less than 6 digits'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username:'',
        password:''
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateusername }],
        password: [{ required: true, trigger: 'blur', validator: validatepassword }]
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined
    }
  },
  watch: {
    $route: {
      handler: function(to) {
        console.log(to)
        this.redirect = to.query && to.query.redirect
      },
      immediate: true
    }
  },
  methods: {
    showPwd: function() {
      if(this.passwordType == 'password') {
        this.passwordType = ''
      }else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin: function() {
      this.$refs.loginForm.validate(vaild => {
        if(vaild) {
            this.loading = true
            //执行登录操作
            /*this.$store.dispatch('user/login', this.loginForm).then(() => {
              this.$router.push({ path: this.redirect || '/' })
              this.loading = false
            }).catch(() => {
              this.loading = false
            })*/
            this.$router.push({ path: this.redirect || '/' })
            this.loading = false
        }else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style lang='scss' scoped>
.login-container {
  width: 100%;
  height: 100%;
  background: #2d3a4b;

  .login-form {
    width: 500px;
    padding: 200px 0;
    margin: 0 auto;

    .title-container {
      color: #fff;
      text-align: center;
    }

    & /deep/ .el-form-item__label {
      color: #fff;
      font-weight: 500;
    }
  }
}
.icon-el{
  display: inline-block;
  font-size: 15px;
  width:12px;
}
</style>
