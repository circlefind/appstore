<template>
  <q-page>
    <q-toolbar class="q-pl-md q-pr-md bgtitle">
      <q-icon name="handyman" size="sm" />
      <q-toolbar-title>
        <span class="text-primary">PENGATURAN</span>
        WEBSITE
      </q-toolbar-title>
      <q-space />
    </q-toolbar>
    <q-separator />
    <q-scroll-area style="height: calc(100vh - 106px);">
      <div class="q-pa-md">
        <q-card class="q-pa-none" style="min-height: calc(100vh - 140px);">
          <q-card-section class="q-pa-none">
            <q-toolbar>
              <q-icon name="o_style" class="text-primary" size="sm" />
              <q-toolbar-title>THEME</q-toolbar-title>
              <q-btn-toggle
                no-caps
                unelevated
                v-model="darktheme"
                toggle-color="primary"
                @input="changeTheme()"
                :options="[
                        {icon: 'o_light_mode', value: false},
                        {icon: 'o_dark_mode', value: true}
                      ]"
              />
            </q-toolbar>
          </q-card-section>
          <q-separator />
          <q-card-section class="q-pa-none">
            <q-toolbar>
              <q-icon name="portrait" class="text-primary" size="sm" />
              <q-toolbar-title>PROFIL USER</q-toolbar-title>
            </q-toolbar>
            <q-card-section v-if="dataUser" class="text-info">
              <div class="row items-center">
                <div class="col-2">Email</div>
                <div class="col-10">{{ dataUser.email }}</div>
              </div>
              <div class="row items-center">
                <div class="col-2">Nama User</div>
                <div class="col-10">{{ dataUser.name }}</div>
              </div>
            </q-card-section>
            <q-toolbar>
              <q-space />
              <q-btn-group flat>
                <q-btn
                  unelevated
                  no-caps
                  color="primary"
                  label="Ubah Password"
                  @click="dispUserPassword()"
                ></q-btn>
                <q-btn
                  unelevated
                  no-caps
                  color="red-10"
                  icon="logout"
                  :loading="loadingsignout"
                  @click="onLogout()"
                >
                  <q-tooltip anchor="bottom middle" self="top end">SIGN OUT</q-tooltip>
                </q-btn>
              </q-btn-group>
            </q-toolbar>
          </q-card-section>
          <q-separator />
          <q-card-section class="q-pa-none">
            <q-toolbar>
              <q-icon name="escalator" class="text-primary" size="sm" />
              <q-toolbar-title>PROFIL WEBSITE</q-toolbar-title>
            </q-toolbar>
            <q-card-section v-if="dataConfig" class="text-info">
              <div class="row items-center">
                <div class="col-2">Title</div>
                <div class="col-10">{{ dataConfig.corporatename }}</div>
              </div>
              <div class="row items-center">
                <div class="col-2">No. Telepon</div>
                <div class="col-10">{{ dataConfig.phone }}</div>
              </div>
              <div class="row items-center">
                <div class="col-2">Facebook</div>
                <div class="col-10">{{ dataConfig.facebook }}</div>
              </div>
              <div class="row items-center">
                <div class="col-2">Whatsapp</div>
                <div class="col-10">{{ dataConfig.whatsapp }}</div>
              </div>
            </q-card-section>
            <q-toolbar>
              <q-space />
              <q-btn unelevated no-caps color="primary" label="Update" @click="dispConfig()"></q-btn>
            </q-toolbar>
          </q-card-section>
          <q-card-section class="q-pa-none">
            <q-toolbar>
              <q-icon name="o_web_asset" class="text-primary" size="sm" />
              <q-toolbar-title>HALAMAN TENTANG</q-toolbar-title>
              <q-btn-group flat>
                <q-btn unelevated no-caps color="primary" label="Update" @click="dispAbout()"></q-btn>
              </q-btn-group>
            </q-toolbar>
            <q-toolbar>
              <q-icon name="o_web_asset" class="text-primary" size="sm" />
              <q-toolbar-title>HALAMAN CARA TRANSAKSI</q-toolbar-title>
              <q-btn-group flat>
                <q-btn unelevated no-caps color="primary" label="Update" @click="dispTransmethod()"></q-btn>
              </q-btn-group>
            </q-toolbar>
            <q-toolbar>
              <q-icon name="o_web_asset" class="text-primary" size="sm" />
              <q-toolbar-title>BANNER</q-toolbar-title>
              <q-btn-group flat>
                <q-btn unelevated no-caps color="primary" label="Update" @click="dispBanner()"></q-btn>
              </q-btn-group>
            </q-toolbar>
          </q-card-section>
        </q-card>
      </div>

      <q-dialog v-model="windConfig" persistent transition-show="none" transition-hide="none">
        <q-card class="q-pa-none" style="width:720px">
          <q-toolbar>
            <q-avatar square>
              <q-icon name="escalator" class="menu-text" />
            </q-avatar>
            <q-toolbar-title>PROFIL WEBSITE</q-toolbar-title>
            <q-btn flat dense no-caps icon="close" v-close-popup />
          </q-toolbar>
          <q-separator />
          <q-card-section>
            <div class="q-gutter-sm">
              <q-input
                dense
                bottom-slots
                :value="formconfig.corporatename"
                v-model="formconfig.corporatename"
                maxlength="50"
                label="Nama Toko"
                :error="$v.formconfig.corporatename.$error"
                error-message="Nama Toko harus diisi"
              ></q-input>
              <div class="row">
                <div class="col q-mr-xs">
                  <q-input
                    dense
                    bottom-slots
                    :value="formconfig.email"
                    v-model="formconfig.email"
                    maxlength="50"
                    label="Email"
                  ></q-input>
                </div>
                <div class="col q-ml-xs"></div>
              </div>
              <div class="row">
                <div class="col q-mr-xs">
                  <q-input
                    dense
                    counter
                    :value="formconfig.phone"
                    v-model="formconfig.phone"
                    label="No. Telepon"
                    mask="###################"
                    maxlength="20"
                  ></q-input>
                </div>
                <div class="col q-ml-xs">
                  <q-input
                    dense
                    bottom-slots
                    :value="formconfig.fax"
                    v-model="formconfig.fax"
                    maxlength="50"
                    label="Fax"
                    input-class="text-uppercase"
                  ></q-input>
                </div>
              </div>
              <div class="row">
                <div class="col q-mr-xs">
                  <q-input
                    dense
                    counter
                    :value="formconfig.facebook"
                    v-model="formconfig.facebook"
                    label="Link Facebook"
                    maxlength="50"
                  ></q-input>
                </div>
                <div class="col q-ml-xs">
                  <q-input
                    dense
                    bottom-slots
                    :value="formconfig.whatsapp"
                    v-model="formconfig.whatsapp"
                    maxlength="50"
                    label="No. Whatsapp"
                    mask="###################"
                  ></q-input>
                </div>
              </div>
            </div>
          </q-card-section>
          <q-card-section align="right">
            <q-btn-group flat>
              <q-btn
                unelevated
                no-caps
                color="primary"
                label="Update"
                :loading="loadingconfig"
                @click="onUpdateConfig()"
              />
            </q-btn-group>
          </q-card-section>
        </q-card>
      </q-dialog>

      <q-dialog v-model="windUserPassword" persistent transition-show="none" transition-hide="none">
        <q-card class="q-pa-none" style="width:580px">
          <q-toolbar>
            <q-toolbar-title class="text-primary">Ubah Password</q-toolbar-title>
            <q-btn flat dense icon="close" v-close-popup />
          </q-toolbar>
          <q-card-section>
            <div class="row q-col-gutter-md">
              <div class="col-5">
                <q-img :src="$apiURL + '/images/password.png'" />
              </div>
              <div class="col-7">
                <q-card flat bordered>
                  <q-card-section>
                    <q-input
                      dense
                      :value="formuserpassword.currentpassword"
                      v-model="formuserpassword.currentpassword"
                      type="password"
                      label="Password Lama"
                      maxlength="50"
                      :error="$v.formuserpassword.currentpassword.$error"
                      error-message="Masukan Password Lama"
                    ></q-input>
                    <q-input
                      dense
                      :value="formuserpassword.password"
                      v-model="formuserpassword.password"
                      type="password"
                      label="Password Baru"
                      maxlength="50"
                      :error="$v.formuserpassword.password.$error"
                      error-message="Password baru minimal 6 karakter"
                    ></q-input>
                    <q-input
                      dense
                      :value="formuserpassword.passwordconfirm"
                      v-model="formuserpassword.passwordconfirm"
                      type="password"
                      label="Konfirmasi Password Baru"
                      maxlength="50"
                      :error="$v.formuserpassword.passwordconfirm.$error"
                      error-message="Konfirmasi Password Baru Tidak Sesuai"
                    ></q-input>
                  </q-card-section>
                </q-card>
                <br />
                <div align="right">
                  <q-btn
                    unelevated
                    no-caps
                    :loading="loading"
                    color="primary"
                    label="Update"
                    @click="onChangePassword()"
                  />
                </div>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </q-dialog>

      <q-dialog
        v-model="windAbout"
        persistent
        full-width
        full-height
        transition-show="none"
        transition-hide="none"
      >
        <q-card>
          <q-layout view="Lhh lpR fff" container>
            <q-header bordered class="bgtitle">
              <q-toolbar>
                <q-avatar square>
                  <q-icon name="crop_din" class="menu-icon" size="sm" />
                </q-avatar>
                <q-toolbar-title>UPDATE HALAMAN TENTANG</q-toolbar-title>
                <q-btn flat dense icon="close" v-close-popup />
              </q-toolbar>
            </q-header>
            <q-page-container>
              <q-card-section>
                <q-editor
                  square
                  v-model="formabout.about"
                  min-height="5rem"
                  ref="editor_ref"
                  @paste.native="evt => pasteCapture(evt)"
                  :toolbar="[
                            ['bold', 'italic', 'strike', 'underline']
                          ]"
                ></q-editor>
              </q-card-section>
              <q-card-section align="right" class="fixed-bottom">
                <q-btn-group flat>
                  <q-btn
                    unelevated
                    no-caps
                    color="primary"
                    label="Update"
                    :loading="loading"
                    @click="onUpdateabout()"
                  />
                </q-btn-group>
              </q-card-section>
            </q-page-container>
          </q-layout>
        </q-card>
      </q-dialog>

      <q-dialog
        v-model="windTransmethod"
        persistent
        full-width
        full-height
        transition-show="none"
        transition-hide="none"
      >
        <q-card>
          <q-layout view="Lhh lpR fff" container>
            <q-header bordered class="bgtitle">
              <q-toolbar>
                <q-avatar square>
                  <q-icon name="crop_din" class="menu-icon" size="sm" />
                </q-avatar>
                <q-toolbar-title>UPDATE HALAMAN CARA TRANSAKSI</q-toolbar-title>
                <q-btn flat dense icon="close" v-close-popup />
              </q-toolbar>
            </q-header>
            <q-page-container>
              <q-card-section>
                <q-editor
                  square
                  v-model="formtransmethod.transmethod"
                  min-height="5rem"
                  ref="editor_ref"
                  @paste.native="evt => pasteCapture(evt)"
                  :toolbar="[
                            ['bold', 'italic', 'strike', 'underline']
                          ]"
                ></q-editor>
              </q-card-section>
              <q-card-section align="right" class="fixed-bottom">
                <q-btn-group flat>
                  <q-btn
                    unelevated
                    no-caps
                    color="primary"
                    label="Update"
                    :loading="loading"
                    @click="onUpdatetransmethod()"
                  />
                </q-btn-group>
              </q-card-section>
            </q-page-container>
          </q-layout>
        </q-card>
      </q-dialog>

      <q-dialog v-model="windBanner" persistent transition-show="none" transition-hide="none">
        <q-card class="q-pa-none" style="width:400px">
          <q-toolbar>
            <q-avatar square>
              <q-icon name="crop_din" class="menu-icon" size="sm" />
            </q-avatar>
            <q-toolbar-title>UPDATE BANNER</q-toolbar-title>
            <q-btn flat dense icon="close" v-close-popup />
          </q-toolbar>
          <q-card-section class="q-gutter-sm">
            <div
              class="text-weight-medium"
            >Format gambar .jpg .jpeg .png dan Untuk gambar optimal gunakan ukuran 1920px x 480px.</div>
            <div v-for="(item,i) in items" :key="'inputImg' + i">
              <q-card
                v-if="!item.image"
                flat
                bordered
                class="q-pa-none cursor-pointer item-center"
                @click="onLoadimage()"
                style="height: 82px; width: 322px"
              >
                <input
                  hidden
                  type="file"
                  id="insertImg"
                  name="insertImg"
                  accept="image/x-png, image/jpeg"
                  @change="onFileChange(item, $event)"
                />
                <q-img src="~assets/addimagebanner.png" :ratio="16/4" />
              </q-card>
              <q-card
                v-else
                flat
                bordered
                class="q-pa-none item-center"
                style="height: 82px; width: 322px"
              >
                <q-img :src="item.image" :ratio="16/4">
                  <q-btn
                    dense
                    unelevated
                    padding="none"
                    color="primary"
                    icon="delete"
                    class="absolute"
                    style="top: 15px; right: 5px; transform: translateY(-50%);"
                    @click="removeImage(item)"
                  />
                </q-img>
              </q-card>
            </div>
          </q-card-section>
          <q-card-section align="right">
            <q-btn
              unelevated
              no-caps
              color="primary"
              label="Update"
              :loading="loading"
              @click="onUpdatebanner()"
            />
          </q-card-section>
        </q-card>
      </q-dialog>
    </q-scroll-area>
  </q-page>
</template>

<script>
import { LocalStorage, Dark, date } from 'quasar'
import { required, sameAs, minLength } from 'vuelidate/lib/validators'
import { mapState } from 'vuex'
export default {
  name: 'Config',
  preFetch ({ store }) {
    store.dispatch('banners/getbanner')
  },
  data () {
    return {
      loading: false,
      loadingsignout: false,
      loadingprint: false,
      loadingconfig: false,
      windBanner: false,
      loadingpassword: false,
      loadingrouteclear: false,
      loadingroutecache: false,
      loadingoptimize: false,
      darktheme: false,
      windConfig: false,
      windUserPassword: false,
      windAbout: false,
      windTransmethod: false,
      formconfig: {
        id: '',
        corporatename: '',
        phone: '',
        fax: '',
        email: '',
        facebook: '',
        whatsapp: '',
        imglogo: ''
      },
      formuser: {
        email: '',
        name: ''
      },
      formuserpassword: {
        currentpassword: '',
        password: '',
        passwordconfirm: ''
      },
      formabout: {
        id: '',
        about: ''
      },
      formtransmethod: {
        id: '',
        transmethod: ''
      },
      items: [
        {
          file: null,
          image: false
        },
        {
          file: null,
          image: false
        },
        {
          file: null,
          image: false
        },
        {
          file: null,
          image: false
        }
      ]
    }
  },
  validations: {
    formconfig: {
      corporatename: { required }
    },
    formuserpassword: {
      currentpassword: { required, minLength: minLength(6) },
      password: { required, minLength: minLength(6) },
      passwordconfirm: { sameAsPassword: sameAs('password') }
    },
    formabout: {
      id: { required }
    },
    formtransmethod: {
      id: { required }
    }
  },
  computed: {
    ...mapState({
      dataConfig: (state) => state.configs.config,
      dataBanner: (state) => state.banners.banner,
      dataUser: (state) => state.auth.user
    })
  },
  mounted () {
    this.formuser = Object.assign(this.formuser, this.dataUser)
    this.darktheme = LocalStorage.getItem('dark')
  },
  methods: {
    pasteCapture (evt) {
      let text, onPasteStripFormattingIEPaste
      evt.preventDefault()
      if (evt.originalEvent && evt.originalEvent.clipboardData.getData) {
        text = evt.originalEvent.clipboardData.getData('text/plain')
        this.$refs.editor_ref.runCmd('insertText', text)
      } else if (evt.clipboardData && evt.clipboardData.getData) {
        text = evt.clipboardData.getData('text/plain')
        this.$refs.editor_ref.runCmd('insertText', text)
      } else if (window.clipboardData && window.clipboardData.getData) {
        if (!onPasteStripFormattingIEPaste) {
          onPasteStripFormattingIEPaste = true
          this.$refs.editor_ref.runCmd('ms-pasteTextOnly', text)
        }
        onPasteStripFormattingIEPaste = false
      }
    },
    onLoadimage () {
      document.getElementById('insertImg').click()
    },
    onFileChange (item, e) {
      const files = e.target.files || e.dataTransfer.files
      if (!files.length) {
        return
      }
      this.createImage(item, files[0])
    },
    createImage (item, file) {
      const reader = new FileReader()

      reader.onload = (e) => {
        item.file = file
        item.image = e.target.result
      }
      reader.readAsDataURL(file)
    },
    removeImage (item) {
      item.file = null
      item.image = false
    },
    clearFile () {
      for (let i = 0; i < this.items.length; i++) {
        this.items[i].file = null
        this.items[i].image = false
      }
    },
    formatDate (fdate) {
      const formattedString = date.formatDate(fdate, 'DD-MM-YYYY')
      return formattedString
    },
    formatDateTime (fdate) {
      const formattedString = date.formatDate(fdate, 'DD-MM-YYYY HH:mm:ss')
      return formattedString
    },
    changeTheme () {
      if (this.darktheme === true) {
        LocalStorage.set('dark', true)
        Dark.set(true)
      } else {
        LocalStorage.set('dark', false)
        Dark.set(false)
      }
    },
    dispConfig () {
      this.$v.$reset()
      Promise.all([
        (this.formconfig = Object.assign(this.formconfig, this.dataConfig))
      ]).finally(() => {
        this.windConfig = true
      })
    },
    dispAbout () {
      this.$v.$reset()
      Promise.all([
        (this.formabout = Object.assign(this.formabout, this.dataConfig))
      ]).finally(() => {
        this.windAbout = true
      })
    },
    dispTransmethod () {
      this.$v.$reset()
      Promise.all([
        (this.formtransmethod = Object.assign(
          this.formtransmethod,
          this.dataConfig
        ))
      ]).finally(() => {
        this.windTransmethod = true
      })
    },
    dispUserPassword () {
      this.$v.$reset()
      Promise.all([
        (this.formuserpassword.currentpassword = ''),
        (this.formuserpassword.password = ''),
        (this.formuserpassword.passwordconfirm = ''),
        (this.isPwd = true),
        (this.isCurPwd = true)
      ]).finally(() => {
        this.windUserPassword = true
      })
    },
    dispBanner () {
      this.$v.$reset()
      this.clearFile()
      Promise.all([]).finally(() => {
        for (let i = 0; i < this.dataBanner.length; i++) {
          this.$store
            .dispatch('banners/getimgurl', this.dataBanner[i].imgbanner)
            .then((response) => {
              const fileURL = window.URL.createObjectURL(
                new Blob([response.data])
              )
              const file = new File(
                [response.data],
                this.dataBanner[i].imgname,
                {
                  type: [response.data].type
                }
              )
              this.items[i].file = file
              this.items[i].image = fileURL
            })
        }
        this.windBanner = true
      })
    },
    onUpdateConfig () {
      this.$v.formconfig.$touch()
      if (!this.$v.formconfig.$error) {
        this.loadingconfig = true
        this.$store
          .dispatch('configs/updateconfig', this.formconfig)
          .then(() => {
            this.windConfig = false
            this.$q.notify({
              position: 'bottom-right',
              color: 'positive',
              textColor: 'white',
              timeout: 2500,
              icon: 'done',
              message: 'PROFIL WEBSITE telah diupdate!'
            })
          })
          .catch(() => {
            this.$q.notify({
              position: 'bottom-right',
              color: 'negative',
              textColor: 'white',
              timeout: 2500,
              icon: 'error_outline',
              message: 'PROFIL WEBSITE gagal diupdate!'
            })
          })
          .finally(() => {
            this.loadingconfig = false
          })
      }
    },
    onUpdateabout () {
      this.$v.formabout.$touch()
      if (!this.$v.formabout.$error) {
        this.loading = true
        this.$store
          .dispatch('configs/updateabout', this.formabout)
          .then(() => {
            this.windAbout = false
            this.$q.notify({
              position: 'bottom-right',
              color: 'positive',
              textColor: 'white',
              timeout: 2500,
              icon: 'done',
              message: 'HALAMAN TENTANG telah diupdate!'
            })
          })
          .catch(() => {
            this.$q.notify({
              position: 'bottom-right',
              color: 'negative',
              textColor: 'white',
              timeout: 2500,
              icon: 'error_outline',
              message: 'HALAMAN TENTANG gagal diupdate!'
            })
          })
          .finally(() => {
            this.loading = false
          })
      }
    },
    onUpdatetransmethod () {
      this.$v.formtransmethod.$touch()
      if (!this.$v.formtransmethod.$error) {
        this.loading = true
        this.$store
          .dispatch('configs/updatetransmethod', this.formtransmethod)
          .then(() => {
            this.windTransmethod = false
            this.$q.notify({
              position: 'bottom-right',
              color: 'positive',
              textColor: 'white',
              timeout: 2500,
              icon: 'done',
              message: 'HALAMAN CARA TRANSAKSI telah diupdate!'
            })
          })
          .catch(() => {
            this.$q.notify({
              position: 'bottom-right',
              color: 'negative',
              textColor: 'white',
              timeout: 2500,
              icon: 'error_outline',
              message: 'HALAMAN CARA TRANSAKSI gagal diupdate!'
            })
          })
          .finally(() => {
            this.loading = false
          })
      }
    },
    onChangePassword () {
      this.$v.formuserpassword.$touch()
      if (!this.$v.formuserpassword.$error) {
        this.loadingpassword = true
        this.$store
          .dispatch('auth/changepassword', this.formuserpassword)
          .then(() => {
            this.windUserPassword = false
            this.$q.notify({
              position: 'bottom-right',
              color: 'positive',
              textColor: 'white',
              timeout: 2500,
              icon: 'done',
              message: 'USER PASSWORD updated'
            })
          })
          .catch((error) => {
            if (error.response) {
              this.$q.notify({
                position: 'bottom-right',
                color: 'red-10',
                textColor: 'white',
                timeout: 2500,
                icon: 'error_outline',
                message: 'USER PASSWORD update FAILED!'
              })
            }
          })
          .finally(() => {
            this.loadingpassword = false
          })
      }
    },
    onUpdatebanner () {
      this.loading = true
      const fd = new FormData()
      for (let i = 0; i < this.items.length; i++) {
        const file = this.items[i].file
        fd.append('imgfile[' + i + ']', file)
      }
      this.$store
        .dispatch('banners/updatebanner', fd)
        .then(() => {
          this.$q.notify({
            position: 'bottom-right',
            color: 'positive',
            textColor: 'white',
            timeout: 2500,
            icon: 'done',
            message: 'BANNER berhasil diupdate!'
          })
          this.windBanner = false
        })
        .catch(() => {
          this.$q.notify({
            position: 'bottom-right',
            color: 'negative',
            textColor: 'white',
            timeout: 2500,
            icon: 'error_outline',
            message: 'BANNER gagal diupdate!'
          })
        })
        .finally(() => {
          this.loading = false
        })
    },
    onLogout () {
      this.loadingsignout = true
      this.$store
        .dispatch('auth/logout')
        .then(() => {
          this.$router.push({ name: 'login' })
        })
        .catch((error) => {
          if (error.response.status === 401) {
            this.$router.push({ name: 'login' })
          }
        })
        .finally(() => {
          this.loadingsignout = false
        })
    }
  }
}
</script>
