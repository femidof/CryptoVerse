import React, { useState } from 'react'
import { Select, Typography, Rol, Col, Avatar, Card, Row } from 'antd'
import moment from 'moment';
import { useGetCryptoNewsQuery } from '../services/CryptoNewsApi';
import { useGetCryptosQuery } from '../services/CryptoApi'; 


const { Text, Title } = Typography;

const { Option } = Select;

const demoImage = 'https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News';
const News = ({ simplified }) => {
  const [ newsCategory, setNewsCategory ]= useState('Cryptocurrency');
  const { data: cryptoNews } = useGetCryptoNewsQuery({ newsCategory, count: simplified ? 10 : 100 });
  const { data } = useGetCryptosQuery(100);

  console.log(cryptoNews);

  if (!cryptoNews?.value) return "Loading...";
  return (
    <Row gutter={[24, 24]}>
      {
        !simplified && (
          <Col span={24}>
            <Select 
            showSearch
              className='select-news'
              placeholder='Select a Crypto'
              optionFilterProp='children'
              onChange={(value) => setNewsCategory(value)}
              filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            >

            <Option value='Cryptocurrency'>Cryptocurrency</Option>
            {data?.data?.coins.map((coin) => <Option value={coin.name}>{coin.name}</Option>)}
            </Select>
          </Col>
        )}
      {
        cryptoNews.value.map((news, i) => (
          <Col xs={24} sm={12} lg={8} key={i}>
            <Card hoverable className='new-card'>
              <a href={news.url} target='_blank' rel='noreferrer'>
                <div className='news-image-container'>
                  <Title className='news-title' level={4}>{news.name}</Title>
                  <img style={{ maxWidth: '200px', maxHeight: '100px' }} src={news?.image?.thumbnail?.contentUrl || demoImage} alt="news" />
                </div>
                <p>
                  {news.description > 100 ? `${news.description.substring(0, 100)}...` :
                    news.description}
                </p>
              </a>
              <div className="provider-container">
                <div className="">
                  <Avatar src={news.provider[0]?.image?.thumbnail?.contentUrl || demoImage} alt="news"></Avatar>
                  <Text className='provider-name'>{news.provider[0]?.name}</Text>
                </div>
                <Text>{moment(news.datePublished).startOf('ss').fromNow()}</Text>
              </div>
            </Card>
          </Col>
        ))
      }

    </Row>
  )
}

export default News