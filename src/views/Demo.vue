<template>
  <div class="overview">
        <Navigation />
        <section class="content">
          <div class="content__section">
            <div class="transacted">
              <div class="transacted__details">
                <h6>Main Account</h6>
                <h3>NevBank Savings Account</h3>
                <h6>00 2893 2302 9203 8912 8923 9238</h6>
              </div>
              <div class="transacted__amount">
                <h6>Available funds</h6>
                <h2>68.789,56 $</h2>
              </div>
            </div>
            <div class="announcement">
             <div class="action">
             </div>
           </div>
          </div>
        </section>

        <section class="content">
          <div class="content__section">
            <div class="total" v-for="(total, id) in totals" :key="id">
              <header>
                <h5 class="total__title">{{ total.name }}</h5>
              </header>
              <section>
                <div class="total__amount">
                  <h3>{{ total.amount }} $</h3>
                </div>
              </section>
            </div>
          </div>
        </section>

        <section class="content">
          <div class="content__section">

            <div class="transactions">

              <header class="transactions__header">
                <h4>Latest transactions</h4>
              </header>

              <section class="transactions__list-container">
                <ul class="transactions__list">
                  <li class="transactions__item" v-for="(item, id) in list" :key="id">
                    <div class="item__time">
                      {{ item.time }}
                    </div>
                    <div class="item__activity">
                      {{ item.activity }}
                    </div>
                    <div class="item__service">
                      {{ item.service }}
                    </div>
                    <div class="item__category">
                      <span class="transactions__badge">●</span>{{ item.category }}
                    </div>
                    <div class="item__amount">
                       {{ item.amount }} $
                    </div>
                  </li>
                </ul>
              </section>
            </div>

            <div class="expense">

              <header class="expense__header">
                <h4>All expenses</h4>
              </header>

              <section class="expense__content">

                <div class="expense__overview">
                  <div>
                    <h6>daily</h6>
                    <h3>275,40 $</h3>
                  </div>

                  <div>
                    <h6>weekly</h6>
                    <h3>1.420,65 $</h3>
                  </div>

                  <div>
                    <h6>monthly</h6>
                    <h3>8.200,00 $</h3>
                  </div>
                </div>

                <div class="expense__donut">
                  <div id="donut">
                  </div>
                </div>
              </section>
            </div>

          </div>
        </section>
  </div>
</template>

<script lang="ts">
import Navigation from '@/components/Navigation.vue'
import DonutChart from '@/services/donutChart'

import { Component, Vue } from 'vue-property-decorator'

@Component({
  components: {
    Navigation
  }
})
export default class Overview extends Vue {
  private totals: Array<object> = [
    {
      name: 'Transactions',
      amount: '12.220,65'
    },
    {
      name: 'Fees',
      amount: '25.070,65'
    },
    {
      name: 'Taxes',
      amount: '570,00'
    },
    {
      name: '2%',
      amount: '2.680,50'
    }
  ]

  private list: Array<object> = [
    { time: 'Today', activity: 'Spotify Premium', service: 'Transfer', category: 'Entertainment', amount: '10,00' },
    { time: 'Today', activity: 'Off White Oxford Street 41', service: 'Card Payment', category: 'Clothes', amount: '260,40' },
    { time: '20:05', activity: 'Google Inc.', service: 'Fee', category: 'Bills', amount: '45,78' }
  ]

  private dataset: Record<string, any> = {
    type: 'Users',
    unit: 'M',
    total: 95.3772820733477,
    data: [
      {
        cat: 'Google Drive',
        val: 26.38206676414893
      },
      {
        cat: 'Dropbox',
        val: 8.926512690189519
      },
      {
        cat: 'iCloud',
        val: 23.33383946772831
      },
      {
        cat: 'OneDrive',
        val: 7.886065661159593
      },
      {
        cat: 'Box',
        val: 28.848797490121342
      }
    ]
  }

  donut () {
    const baker = new DonutChart(this.dataset)
    baker.create()
  }

  mounted () {
    this.donut()
  }
}
</script>

<style lang="css" scoped>

.center-txt {
  padding: 5px 0;
}

@media screen and (min-device-width: 1200px) {
  .content {
      margin-top: 40px;
  }

  .content__section {
    display: flex;
  }

  .transacted {
    background: #36353A;
    border-radius: 3px;
    border: 1px rgba(255,255,255,.2) solid;
    width: 887px;
    margin-right: 41px;
    height: 150px;
    padding: 0 15px;
    border-radius: 10px;
    display: flex;
    justify-content: space-between;
  }

  .announcement {
    width: 755px;
    height: 150px;
    padding: 0 15px;
    border-radius: 10px;
    display: flex;
    justify-content: space-between;
  }

  .total {
    background: #36353A;
    border-radius: 3px;
    border: 1px rgba(255,255,255,.2) solid;
    width: 320px;
    height: 100px;
    padding: 22px 26px;
    margin-right: 35px;
    border-radius: 10px;
    justify-content: space-between;
  }

  .total:last-child{
    margin-right: 0;
  }

  .total__title {
    margin: 0;
  }

  .transactions {
    background: #36353A;
    border-radius: 3px;
    border: 1px rgba(255,255,255,.2) solid;
    width: 887px;
    height: 450px;
    padding: 22px 26px;
    margin-right: 35px;
    border-radius: 10px;
    justify-content: space-between;
  }

  .expense {
    background: #36353A;
    border-radius: 3px;
    border: 1px rgba(255,255,255,.2) solid;
    width: 455px;
    height: 450px;
    padding: 22px 26px;
    border-radius: 10px;
    justify-content: space-between;
  }

  .transactions__list {
    list-style: none;
    padding: 0;
  }

  .transactions__item {
    display: flex;
    justify-content: space-between;
    font-size: 14px;
    padding: 15px 0;
    border-bottom: 1px solid #3d3d3d;
  }

  .transactions__badge {
    margin-right: 5px;
  }

  .item__time {
    width: 40px;
  }

  .item__activity {
    width: 200px;
  }

  .item__service {
    width: 100px;
  }

  .item__category {
    width: 80px;
  }

  .item__amount {
    width: 80px;
  }

  .expense__overview {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #3d3d3d;
    margin-bottom: 20px;
  }

  .expense__donut {
    margin: 0 auto;
  }

}

</style>
