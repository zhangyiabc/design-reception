<template>
  <div class="home-container">
    <Layout>
      <template>
        <div class="home-content">
          <a-affix :offset-top="top">
            <div class="top">
              <div class="know">
                <p class="info">{{ infoData.hitokoto }}</p>
                <div class="from">
                  <span>————</span>
                  <span>《{{ infoData.from }}》</span>
                </div>
              </div>
              <div class="select">
                <template v-for="info in tags">
                  <a-checkable-tag
                    class="check"
                    :key="info.id"
                    :checked="selectedTags.indexOf(info.id) > -1"
                    @change="(checked) => handleChange(info, checked)"
                  >
                    {{ info.tag }}
                  </a-checkable-tag>
                </template>
              </div>
            </div>
          </a-affix>
          <div class="blog">
            <div class="left-blog">
              <div class="blog-container" v-if="!isLoading">
                <a-empty
                  :imageStyle="{ height: '200px' }"
                  v-if="blogList.length == 0"
                  :image="simpleImage"
                  description="试试别的选项，暂无数据哦~"
                />
                <template v-else v-for="blog in blogList">
                  <BlogCard :blog="blog" :key="blog.id" />
                </template>
              </div>
              <div v-if="isLoading">
                <a-spin class="spin" size="large" tip="玩命加载中..." />
              </div>
              <div class="pager" v-if="blogList.length > 0">
                <a-pagination
                  show-quick-jumper
                  :default-current="pager.page"
                  :total="pager.total"
                  @change="onPagerChange"
                />
              </div>
            </div>
            <div class="right-blog">
              <div class="welcome">
                <div class="head">
                  <span class="svg">
                    <svg
                      t="1646981050746"
                      class="icon"
                      viewBox="0 0 1024 1024"
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                      p-id="4860"
                      width="30"
                      height="30"
                    >
                      <path
                        d="M777.709071 851.471823c-38.019867-3.327988-73.703742-18.145937-99.805651-42.607851-17.19594-16.115944-18.073937-43.119849-1.957993-60.315789 16.113944-17.19594 43.119849-18.073937 60.315789-1.957993 14.927948 13.989951 45.069842 25.023913 78.743725 18.145936 26.385908-5.391981 63.097779-23.773917 88.171691-80.727717 9.495967-21.567925 34.683879-31.34789 56.247804-21.861924 21.569925 9.495967 31.35789 34.679879 21.861923 56.249803-31.027892 70.483754-84.013706 116.635592-149.193478 129.957546a189.747337 189.747337 0 0 1-54.38381 3.117989z"
                        fill="#F3C74F"
                        p-id="4861"
                      ></path>
                      <path
                        d="M924.574558 511.479012m-98.007658 0a98.007657 98.007657 0 1 0 196.015315 0 98.007657 98.007657 0 1 0-196.015315 0Z"
                        fill="#0081C6"
                        p-id="4862"
                      ></path>
                      <path
                        d="M924.574558 511.479012m-45.75584 0a45.75584 45.75584 0 1 0 91.51168 0 45.75584 45.75584 0 1 0-91.51168 0Z"
                        fill="#F3C74F"
                        p-id="4863"
                      ></path>
                      <path
                        d="M590.271726 177.178181m-98.007657 0a98.007657 98.007657 0 1 0 196.015315 0 98.007657 98.007657 0 1 0-196.015315 0Z"
                        fill="#0081C6"
                        p-id="4864"
                      ></path>
                      <path
                        d="M590.271726 177.178181m-45.75584 0a45.75584 45.75584 0 1 0 91.51168 0 45.75584 45.75584 0 1 0-91.51168 0Z"
                        fill="#F3C74F"
                        p-id="4865"
                      ></path>
                      <path
                        d="M542.183894 237.42597c-38.273866-38.273866-38.273866-100.327649 0-138.601515a98.113657 98.113657 0 0 1 20.491929-15.689946 97.539659 97.539659 0 0 0-41.699854 24.751914c-38.271866 38.273866-38.273866 100.327649 0 138.601515 32.013888 32.013888 80.653718 37.22987 118.111587 15.689945-33.265884 9.727966-70.669753 1.481995-96.903662-24.751913z"
                        opacity=".2"
                        p-id="4866"
                      ></path>
                      <path
                        d="M785.131045 752.116171c119.903581-119.903581 192.675326-392.596627 74.889738-510.382216S469.540148 196.720112 349.636568 316.623693s-119.613582 314.5909 0.643997 434.85048 314.948899 120.547579 434.85048 0.641998z"
                        fill="#40BAB3"
                        p-id="4867"
                      ></path>
                      <path
                        d="M313.488694 360.109541c-82.125713 119.641582-69.821756 284.749004 36.793871 391.364632s271.72505 118.919584 391.364632 36.793871l-428.158503-428.158503z"
                        fill="#FFFFFF"
                        p-id="4868"
                      ></path>
                      <path
                        d="M263.392869 487.297096c-14.119951 93.383674 14.847948 192.133328 86.889696 264.177077s170.791403 101.011647 264.177077 86.889696L263.392869 487.297096z"
                        fill="#0081C6"
                        p-id="4869"
                      ></path>
                      <path
                        d="M396.460404 751.474173c-120.25758-120.25958-120.547579-314.946899-0.643998-434.85048C468.000154 244.437945 595.559708 189.358138 711.357303 182.634161c-126.455558-7.875972-279.773022 52.039818-361.722735 133.989532-119.903581 119.903581-119.613582 314.5909 0.643997 434.85048 66.117769 66.117769 154.737459 95.957665 241.055158 89.509687-70.973752-5.321981-140.525509-35.161877-194.873319-89.509687z"
                        opacity=".2"
                        p-id="4870"
                      ></path>
                      <path
                        d="M524.201957 339.991611a16.471942 16.471942 0 0 1-11.645959-28.117901l5.959979-5.95998a16.471942 16.471942 0 0 1 23.291919 23.293919l-5.959979 5.959979a16.419943 16.419943 0 0 1-11.64596 4.823983zM778.235069 594.022723a16.469942 16.469942 0 0 1-11.647959-28.113901l5.959979-5.96198a16.467942 16.467942 0 0 1 23.293919-0.002 16.469942 16.469942 0 0 1 0.002 23.291919l-5.95998 5.961979a16.423943 16.423943 0 0 1-11.647959 4.823983zM663.255471 527.770955c-11.943958 0-23.883916-4.543984-32.975885-13.635952-7.907972-7.907972-12.625956-18.153937-13.507952-29.177898a46.415838 46.415838 0 0 1-29.149898-13.479953c-18.183936-18.183936-18.183936-47.769833-0.002-65.95177a16.471942 16.471942 0 0 1 23.293918 23.289919c-5.339981 5.339981-5.339981 14.029951 0 19.369932s14.027951 5.337981 19.365932-0.002a16.471942 16.471942 0 0 1 23.291919 23.295919 13.607952 13.607952 0 0 0-4.009986 9.679966c0 3.657987 1.425995 7.095975 4.011986 9.681966a13.705952 13.705952 0 0 0 19.365932 0 16.471942 16.471942 0 0 1 23.291919 23.295919c-9.091968 9.087968-21.035926 13.633952-32.975885 13.633952z"
                        fill="#394049"
                        p-id="4871"
                      ></path>
                      <path
                        d="M495.022059 405.523382a16.425943 16.425943 0 0 1-11.645959-4.821983l-36.351873-36.351873a16.471942 16.471942 0 0 1 23.291919-23.293918l36.351873 36.351873a16.471942 16.471942 0 0 1-11.64596 28.115901zM749.053171 659.556494a16.419943 16.419943 0 0 1-11.645959-4.823983l-36.351873-36.353873a16.469942 16.469942 0 1 1 23.293919-23.289918l36.351873 36.353872a16.471942 16.471942 0 0 1 0 23.293919 16.439943 16.439943 0 0 1-11.64796 4.819983z"
                        fill="#F0B0B7"
                        p-id="4872"
                      ></path>
                      <path
                        d="M10.031755 988.463344l420.58453 35.457876c12.491956 1.051996 23.211919-8.801969 23.211918-21.335925V21.416725c0-12.535956-10.721963-22.389922-23.211918-21.337925L10.031755 35.534676a9.401967 9.401967 0 0 0-8.61197 9.367967v934.188734a9.399967 9.399967 0 0 0 8.61197 9.371967z"
                        fill="#A27B5A"
                        p-id="4873"
                      ></path>
                      <path
                        d="M358.524537 551.556872m-40.22386 0a40.223859 40.223859 0 1 0 80.447719 0 40.223859 40.223859 0 1 0-80.447719 0Z"
                        opacity=".2"
                        p-id="4874"
                      ></path>
                      <path
                        d="M373.260485 532.802937m-40.223859 0a40.223859 40.223859 0 1 0 80.447718 0 40.223859 40.223859 0 1 0-80.447718 0Z"
                        fill="#F3C74F"
                        p-id="4875"
                      ></path>
                      <path
                        d="M376.100475 492.715077c-7.367974 5.80798-12.115958 14.789948-12.115958 24.899913 0 17.513939 14.19795 31.713889 31.71389 31.713889 5.78998 0 11.203961-1.575994 15.877944-4.287985 1.233996-3.861986 1.909993-7.971972 1.909993-12.241957-0.002-21.259926-16.501942-38.621865-37.385869-40.08386z"
                        fill="#FFFFFF"
                        opacity=".4"
                        p-id="4876"
                      ></path>
                      <path
                        d="M430.618285 0.0788L247.454925 15.520746c-19.267933 26.905906-30.645893 59.845791-30.645893 95.463666 0 90.683683 73.511743 164.195426 164.195426 164.195426a163.459429 163.459429 0 0 0 72.825745-17.031941V21.416725c0-12.537956-10.719963-22.389922-23.211918-21.337925z"
                        fill="#FFFFFF"
                        opacity=".1"
                        p-id="4877"
                      ></path>
                    </svg>
                  </span>
                  <span>{{ welcome }}!</span>
                </div>

                <div class="author">
                  欢迎使用， 尊敬的用户——<span>{{
                    $store.getters.info.author
                  }}</span>
                </div>
              </div>
              <div class="order">
                <div class="title">
                  <span class="svg">
                    <svg
                      t="1646981704092"
                      class="icon"
                      viewBox="0 0 1024 1024"
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                      p-id="7671"
                      width="40"
                      height="40"
                    >
                      <path
                        d="M761.5 938c-0.3 0-0.4-0.1-0.6-0.3L521.7 698.5c-0.4-0.4-0.4-1 0-1.4l182.5-182.5c0.1-0.1 0.3-0.3 0.7-0.3s0.6 0.2 0.7 0.3l239.2 239.2c0.1 0.1 0.4 0.4 0.3 0.9-0.1 0.5-0.4 0.6-0.6 0.7l-102 34.3C821 797 804 814 796.8 835.3l-34.3 102c-0.2 0.6-0.7 0.7-1 0.7z"
                        fill="#F46070"
                        p-id="7672"
                      ></path>
                      <path
                        d="M704.8 535.2l213.3 213.3-80.6 27.1c-25.8 8.7-46.3 29.2-55 55l-27.1 80.6-213.2-213.3 162.6-162.7m0-35.8c-4.1 0-8.2 1.6-11.3 4.7L511.1 686.6c-6.2 6.2-6.2 16.4 0 22.6l239.2 239.2c3.2 3.2 7.2 4.7 11.2 4.7 6.5 0 12.9-3.9 15.2-10.9l34.3-102c5.7-17 19.1-30.4 36.1-36.1l102-34.3c11.2-3.8 14.6-18.1 6.2-26.4L716.1 504.1c-3.1-3.1-7.2-4.7-11.3-4.7z"
                        fill="#3A3644"
                        p-id="7673"
                      ></path>
                      <path
                        d="M918.1 748.5L704.8 535.2 542.2 697.9l31.4 31.4 125.3 67.3c0.5 0 85.5-78.4 86-78.4 4.1 0-28.3 35.3-24.5 36.9l125.3 4.4 32.4-11z"
                        fill="#EF4554"
                        p-id="7674"
                      ></path>
                      <path
                        d="M262.5 938c-0.5 0-0.8-0.2-1-0.7l-34.3-102C220 814 203 797 181.7 789.8l-102-34.3c-0.2-0.1-0.5-0.2-0.6-0.7-0.1-0.5 0.1-0.8 0.3-0.9l239.2-239.2c0.1-0.1 0.3-0.3 0.7-0.3 0.4 0 0.6 0.2 0.7 0.3l182.5 182.5c0.4 0.4 0.4 1 0 1.4L263.1 937.7c-0.2 0.2-0.3 0.3-0.6 0.3z"
                        fill="#F46070"
                        p-id="7675"
                      ></path>
                      <path
                        d="M319.2 535.2l162.6 162.6-213.3 213.3-27.1-80.6c-8.7-25.8-29.2-46.3-55-55l-80.6-27.1 213.4-213.2m0-35.8c-4.1 0-8.2 1.6-11.3 4.7L68.7 743.3c-8.4 8.4-5 22.7 6.2 26.4l102 34.3c17 5.7 30.4 19.1 36.1 36.1l34.3 102c2.3 7 8.7 10.9 15.2 10.9 4 0 8.1-1.5 11.2-4.7l239.2-239.2c6.2-6.2 6.2-16.4 0-22.6L330.5 504.1c-3.2-3.1-7.2-4.7-11.3-4.7z"
                        fill="#3A3644"
                        p-id="7676"
                      ></path>
                      <path
                        d="M105.9 748.5l213.3-213.3 162.6 162.6-31.4 31.4-209.7-11.1h-1.6c-4.1 0-8.2 0.9-12 2.5l-88.8 38.8-32.4-10.9z"
                        fill="#EF4554"
                        p-id="7677"
                      ></path>
                      <path
                        d="M458.2 787.9c-9.1-11.6-22.7-18.2-37.4-18.2-6.1 0-12.1 1.2-17.7 3.4l-80.9 32.6-12.2-86.4c-3-20.8-19.5-37.4-40.3-40.3l-86.3-12.2 32.6-80.9c7.8-19.5 1.8-42.1-14.8-55.1L132.5 477l68.6-53.8c16.5-13 22.6-35.6 14.8-55.1l-32.6-80.9 86.3-12.2c20.8-3 37.4-19.5 40.3-40.3l12.2-86.3L403 181c5.7 2.3 11.6 3.4 17.7 3.4 14.7 0 28.3-6.6 37.4-18.2L512 97.6l53.8 68.6c9.1 11.6 22.7 18.2 37.4 18.2 6.1 0 12.1-1.2 17.7-3.4l80.9-32.6 12.2 86.3c3 20.8 19.5 37.4 40.3 40.3l86.3 12.2-32.6 80.9c-7.8 19.5-1.8 42.1 14.8 55.1l68.6 53.8-68.6 53.8c-16.5 13-22.6 35.6-14.8 55.1l32.6 80.9-86.3 12.2c-20.8 3-37.4 19.5-40.3 40.3l-12.2 86.3-80.9-32.6c-5.7-2.3-11.6-3.4-17.7-3.4-14.7 0-28.3 6.6-37.4 18.2L512 856.5l-53.8-68.6z"
                        fill="#F8A77B"
                        p-id="7678"
                      ></path>
                      <path
                        d="M512 138.1l34.1 43.5c13.8 17.7 34.6 27.8 57.1 27.8 9.3 0 18.4-1.8 27.1-5.2l51.3-20.6 7.8 54.7c4.5 31.7 29.8 57.1 61.6 61.6l54.7 7.8-20.6 51.3c-12 29.7-2.7 64.3 22.5 84.1l43.5 34.1-43.5 34.1c-25.2 19.8-34.5 54.4-22.5 84.1l20.6 51.3-54.7 7.8c-31.7 4.5-57.1 29.8-61.6 61.6l-7.8 54.7-51.3-20.6c-8.6-3.5-17.7-5.2-27-5.2-22.4 0-43.2 10.1-57.1 27.8L512 815.9l-34.1-43.5c-13.8-17.7-34.6-27.8-57.1-27.8-9.3 0-18.4 1.8-27.1 5.2l-51.3 20.6-7.8-54.7c-4.5-31.7-29.8-57.1-61.6-61.6l-54.7-7.8 20.6-51.3c12-29.7 2.7-64.3-22.5-84.1L173.1 477l43.5-34.1c25.2-19.8 34.5-54.4 22.5-84.1l-20.6-51.3 54.7-7.8c31.7-4.5 57.1-29.8 61.6-61.6l7.8-54.7 51.3 20.6c8.6 3.5 17.7 5.2 27.1 5.2 22.4 0 43.2-10.1 57.1-27.8l33.9-43.3m0-67.1c-6.6 0-13.2 2.9-17.7 8.6l-55.8 71.2c-4.4 5.6-10.9 8.6-17.7 8.6-2.8 0-5.7-0.5-8.4-1.6L328.6 124c-2.8-1.1-5.6-1.6-8.4-1.6-10.8 0-20.6 7.8-22.2 19.3l-12.7 89.5c-1.4 9.9-9.2 17.7-19.1 19.1L176.7 263c-14.4 2-23.1 17.1-17.7 30.6l33.8 83.9c3.7 9.3 0.9 19.9-7 26.1l-71.2 55.8c-11.5 9-11.5 26.4 0 35.4l71.2 55.8c7.9 6.2 10.7 16.8 7 26.1L159 660.4c-5.4 13.5 3.2 28.6 17.7 30.6l89.5 12.7c9.9 1.4 17.7 9.2 19.1 19.1l12.7 89.5c1.6 11.5 11.5 19.3 22.2 19.3 2.8 0 5.6-0.5 8.4-1.6l83.9-33.8c2.7-1.1 5.6-1.6 8.4-1.6 6.8 0 13.3 3.1 17.7 8.6l55.8 71.2c4.5 5.7 11.1 8.6 17.7 8.6s13.2-2.9 17.7-8.6l55.8-71.2c4.4-5.6 10.9-8.6 17.7-8.6 2.8 0 5.7 0.5 8.4 1.6l83.9 33.8c2.8 1.1 5.6 1.6 8.4 1.6 10.8 0 20.6-7.8 22.2-19.3l12.7-89.5c1.4-9.9 9.2-17.7 19.1-19.1l89.5-12.7c14.4-2 23.1-17.1 17.7-30.6l-33.8-83.9c-3.7-9.3-0.9-19.9 7-26.1l71.2-55.8c11.5-9 11.5-26.4 0-35.4l-71.2-55.8c-7.9-6.2-10.7-16.8-7-26.1l33.8-83.9c5.4-13.5-3.2-28.6-17.7-30.6L758 250.1c-9.9-1.4-17.7-9.2-19.1-19.1L726 141.7c-1.6-11.5-11.5-19.3-22.2-19.3-2.8 0-5.6 0.5-8.4 1.6l-83.9 33.8c-2.7 1.1-5.6 1.6-8.4 1.6-6.8 0-13.3-3.1-17.7-8.6l-55.8-71.2c-4.4-5.7-11-8.6-17.6-8.6z"
                        fill="#3A3644"
                        p-id="7679"
                      ></path>
                      <path
                        d="M292 501.3a220 221.3 0 1 0 440 0 220 221.3 0 1 0-440 0Z"
                        fill="#F37C4B"
                        p-id="7680"
                      ></path>
                      <path
                        d="M512 680c-111.9 0-203-91.1-203-203s91.1-203 203-203 203 91.1 203 203c0 112-91.1 203-203 203z"
                        fill="#FFED8B"
                        p-id="7681"
                      ></path>
                      <path
                        d="M512 289c50.2 0 97.4 19.6 132.9 55.1S700 426.8 700 477s-19.6 97.4-55.1 132.9C609.4 645.5 562.2 665 512 665s-97.4-19.6-132.9-55.1S324 527.2 324 477s19.6-97.4 55.1-132.9S461.8 289 512 289m0-30c-120.4 0-218 97.6-218 218s97.6 218 218 218 218-97.6 218-218-97.6-218-218-218z"
                        fill="#3A3644"
                        p-id="7682"
                      ></path>
                      <path
                        d="M390.3 337.7C377 349 365.5 362.9 355.9 378l45.6 79c5.5 9.5 17.8 12.8 27.3 7.3l8.7-5c9.5-5.5 12.8-17.8 7.3-27.3l-54.5-94.3zM480.9 294.6c-17.9 3.2-33.9 8.2-49 15.6l98.5 170.1c5.5 9.5 17.8 12.8 27.3 7.3l8.7-5c9.5-5.5 12.8-17.8 7.3-27.3l-92.8-160.7z"
                        fill="#FFFDF5"
                        p-id="7683"
                      ></path>
                    </svg>
                  </span>
                  <span class="desc">作者排行榜</span>
                </div>
                <div class="content">
                  <template v-for="order of orderUserList">
                    <OrderCard :Info="order" :key="order.id" />
                  </template>
                </div>
              </div>
              <div class="record">
                知识星球 -- <a href="https://beian.miit.gov.cn" target="_blank">鄂ICP备2021016350号</a> 
              </div>
            </div>
          </div>
        </div>
      </template>
    </Layout>
  </div>
</template>

<script>
import { orderUser } from "@/apis/user";
import Layout from "@/layout";
import OrderCard from "./components/OrderCard/index.vue";
import { getAllLabel } from "@/apis/label";
import { sentence } from "@/apis/sentence";
import BlogCard from "@/components/blogCard/index.vue";
import { getAllArticle } from "@/apis/article";
import store from "@/store";
import moment from "moment";
const imgSrc = require("@/assets/empty.png");
export default {
  components: {
    Layout,
    BlogCard,
    OrderCard,
  },
  data() {
    return {
      isLoading: false,
      tags: [],
      top: 0,
      simpleImage: imgSrc,
      infoData: [],
      blogList: [],
      orderUserList: [],
      selectedTags: [],
      reqBody: {
        title: "",
        LabelId: "",
        review: "success",
      },
      pager: {
        page: 1,
        size: 10,
        total: 0,
      },
    };
  },
  computed: {
    welcome() {
      const hours = moment().hours();
      if (hours < 11) {
        return "早上好";
      } else if (hours < 14) {
        return "中午好";
      } else if (hours < 20) {
        return "下午好";
      } else {
        return "晚上好";
      }
    },
  },
  watch: {
    $route(to) {
      this.selectedTags = [+to.query.tag];
      this.reqBody.LabelId = +to.query.tag || "all";
      this.getBlogList();
    },
  },
  created() {
    this.selectedTags = [+this.$route.query.tag];
    this.reqBody.LabelId = +this.$route.query.tag || "all";
    // 获取名言警句
    this.getSentence();
    // 获取博客列表
    this.getBlogList();
    // 获取用户排行
    this.getOrderUser();
    if (store.getters.tags.length == 0) {
      this.getLabelList();
    } else {
      this.tags = store.getters.tags;
    }
  },
  methods: {
    getSentence() {
      sentence().then((res) => {
        this.infoData = res;
      });
    },
    getLabelList() {
      getAllLabel().then((res) => {
        this.tags = res.data;
        store.dispatch("label/setTags", res.data);
      });
    },
    handleChange(tag, check) {
      if (!check) {
        this.selectedTags = [];
        this.reqBody.LabelId = "all";
        this.getBlogList();
        this.$router.push({
          path: "/",
        });
        // return;
      } else {
        this.selectedTags = [tag.id];
        this.reqBody.LabelId = tag.id;
        this.getBlogList();
        this.$router.push({
          path: "/",
          query: {
            tag: +tag.id,
          },
        });
      }
    },
    getBlogList() {
      const body = {
        ...this.reqBody,
        ...this.pager,
      };
      this.isLoading = true;
      getAllArticle(body).then((res) => {
        this.blogList = res.data.data;
        this.pager.total = res.data.total;
        this.isLoading = false;
      });
    },
    // 页码改变
    onPagerChange(page) {
      this.pager.page = page;
      this.getBlogList();
    },
    getOrderUser() {
      orderUser({
        size: 5,
      }).then((res) => {
        const tempList = [];
        for (const item of res.data) {
          delete item.password;
          tempList.push(item);
        }
        this.orderUserList = tempList;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.home-container {
  height: 100%;
  .home-content {
    // height: 100%;
    background-color: rgb(244, 245, 245);
    padding-bottom: 50px;
  }
  .top {
    // position: fixed;
    width: 100%;
    padding: 0 20px;
    height: 52px;
    display: flex;
    background-color: #fff;
    margin-bottom: 20px;
    border-top: 1px solid #f1f1f1;
    border-bottom: 1px solid #f1f1f1;

    .check {
      border: 1px solid #f1f1f1;
      margin-top: 2px;
    }
    .know {
      position: relative;
      width: 60%;
      p {
        margin: 0;
        padding: 0;
        padding-top: 2px;
        &.info {
          font-size: 17px;
          color: #555;
          font-family: "华文楷体";
          font-weight: bold;
        }
      }
      div {
        font-size: 17px;

        font-family: "华文楷体";
        position: absolute;
        right: 40px;
        font-weight: bold;
      }
      .from {
        position: absolute;
        right: 40px;
      }
    }
  }
  .blog {
    width: 80%;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    .left-blog {
      width: 70%;
      .blog-container {
        margin-bottom: 20px;
      }
      .spin {
        position: absolute;
        top: 50%;
        left: 50%;
      }
    }
    .right-blog {
      width: 27%;
      .welcome {
        padding: 10px;
        background-color: #fff;
        div.head {
          height: 30px;
          display: flex;
          align-content: center;
          padding: 0 10px;
          margin-bottom: 10px;
        }
        span {
          font-size: 16px;
          line-height: 30px;
          &.svg {
            width: 30px;
            height: 30px;
            margin-right: 8px;
          }
        }
        .author {
          font-size: 16px;
          span {
            line-height: 30px;
            font-weight: 700;
            letter-spacing: 5px;
          }
        }
      }
      .order {
        padding: 20px;
        margin-top: 18px;
        background-color: #fff;
        .title {
          display: flex;
          height: 46px;
          align-items: center;
          border-bottom: 1px solid #f1f1f1;
          span.svg {
            margin-right: 10px;
          }
          span.desc {
            font-size: 16px;
            letter-spacing: 2px;
          }
        }
      }
      .record{
        margin-top: 10px;
      }
    }
    .pager {
      text-align: center;
    }
  }
}
</style>
