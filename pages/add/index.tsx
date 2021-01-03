import React, {useState, useRef} from 'react'
import styles from './add.module.scss'
import Layout from '@components/layout/Layout'
import Image from 'next/image'
import {Form, Input, Button, Radio} from 'antd'
import {InfoCircleOutlined} from '@ant-design/icons'
import {applySession} from 'next-session'
import {sessionConfig} from '@config/index'

const Add = ({session}) => {
    const [form] = Form.useForm()

    return (
        <Layout session={session}>
            <Form form={form} layout="vertical" requiredMark={true}>
                <Form.Item label="Field A" required tooltip="This is a required field">
                    <Input placeholder="input placeholder" />
                </Form.Item>
                <Form.Item
                    label="Field B"
                    tooltip={{title: 'Tooltip with customize icon', icon: <InfoCircleOutlined />}}>
                    <Input placeholder="input placeholder" />
                </Form.Item>
                <Form.Item>
                    <Button type="primary">Submit</Button>
                </Form.Item>
            </Form>
        </Layout>
    )
}

export async function getServerSideProps({req, res}) {
    await applySession(req, res, sessionConfig)
    return {
        props: {
            session: {
                user: req.session?.user ? req.session.user : {},
            },
        },
    }
}

export default Add
