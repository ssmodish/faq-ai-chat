// install node.js 18.12.1 version
import Head from 'next/head'
import Image from 'next/image'
import Question from '../comps/Question'
import Answer from '../comps/Answer'
import Display from '../comps/Display'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  
  function formSubmit() {
    e.preventDefault();
    callAPI();
  }

  const callAPI = async () => {
    try {
      const question = document.querySelector('#question-input').value
      const query = {"query": question}
      console.log(query)
      // const res = await fetch('https://beam.slai.io/ceepi',
      // {
      //   method: 'POST',
      //   headers: {
      //     // Accept: '*/*',
      //     // 'Accept-Encoding': 'gzip, deflate',
      //     Authorization: 'Basic NDAxMmE1NzI5ZGZkNzkyMTVjN2VkYzIzZmJkNjk4ODc6ODkzZDMxZjdhMTBhMjkyYjBhZGJjNDdlZTQ3ZDU3YTg=',
      //     // Connection: 'keep-alive',
      //     // 'Content-Type': 'application/json',
      //   },
      //   query: query,
      // });
      const res = await fetch('https://beam.slai.io/ceepi', {
        method: 'POST',
        headers: {
          'Accept': '*/*',
          'Accept-Encoding': 'gzip, deflate',
          'Authorization': 'Basic NDAxMmE1NzI5ZGZkNzkyMTVjN2VkYzIzZmJkNjk4ODc6ODkzZDMxZjdhMTBhMjkyYjBhZGJjNDdlZTQ3ZDU3YTg=',
          'Connection': 'keep-alive',
          'Content-Type': 'application/json'
        },
        // body: '{"query": "Give me a summary of the days news"}',
        body: JSON.stringify({
            'query': query,
        })
      });

      console.log(res)
      const data = await res.json();
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  }
  
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <Display style={styles} question="What is your name?" answer="Zephyr"/>
      <section className={styles.form_container}>
        <form className={styles.question_form} onSubmit={formSubmit}>
          <input id="question-input" className={styles.question_input} type="text"></input>
        </form>
        <button className={styles.enter} onClick={callAPI}>Enter</button>
      </section>
    </>
  )
}
