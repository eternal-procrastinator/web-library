import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Breadcrumb } from 'antd';
import { HomeOutlined } from '@ant-design/icons';

export const Breadcrumbs: React.FC = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  return (
    <Breadcrumb style={{ padding: 16 }}>
      <Breadcrumb.Item>
        <Link to="/">
          <HomeOutlined /> Home
        </Link>
      </Breadcrumb.Item>
      {pathnames.map((name, index) => {
        const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
        const isLast = index === pathnames.length - 1;
        return isLast ? (
          <Breadcrumb.Item key={name}>{name}</Breadcrumb.Item>
        ) : (
          <Breadcrumb.Item key={name}>
            <Link to={routeTo}>{name}</Link>
          </Breadcrumb.Item>
        );
      })}
    </Breadcrumb>
  );
};
