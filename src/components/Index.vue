<template>
<el-container>
  <el-header>
 <Header />
  </el-header>
  <el-container>
    <el-aside width="200px">
    <Side/>
    </el-aside>
    <el-main>
    <Middle/>
    </el-main>
  </el-container>
</el-container>

<!-- <el-container >
  <el-aside width="200px"> <Side/></el-aside>
  <el-container>
    <el-header> <Header /></el-header>
    <el-main>  <Middle/></el-main>
  </el-container>
</el-container> -->
</template>

<script>
import Header from '@/pages/Header.vue'
import Side from '@/pages/Side.vue'
import Middle from '@/pages/Middle.vue'

 export default {
        name: 'Home',
        components: {
            Header,
            Side,
            Middle
        },
        data() {
            return {
                foldAside: true
            }
        },
        methods: {
            foldOrOpen(data) {
                this.foldAside = data
            }
        }
    }
</script>

<style>
element.style {
     height: 0px; 
}
</style>
