import { Layout, LegacyCard, Page, Tabs } from '@shopify/polaris'
import React, { useCallback } from 'react'
import { PrioritySettings } from 'app/components/PrioritySettings'
import { SalesForceSettings } from 'app/components/SalesForceSettings'
import type { LoaderFunctionArgs } from "@remix-run/node"; // or cloudflare/deno
import { json } from "@remix-run/node"; // or cloudflare/deno
import { useLoaderData } from "@remix-run/react";

export async function loader({
  request,
}: LoaderFunctionArgs) {
  const settings = {
    priority: {
      url: 'https://api.priority-example.com',
      apiKey: '1234567890',
      apiUser: 'priorityAdmin'
    },
    salesforce: {
      url: 'https://api.salesforce-example.com',
      apiKey: '1234567890',
      apiUser: 'salesforceAdmin'
    }


  }
  return json(settings);
}

type Props = {}

const Settings = (props: Props) => {
  const settings = useLoaderData<typeof loader>();
  const [selected, setSelected] = React.useState(0)

  const handleTabeChange = useCallback((selectedTabIndex: number) => setSelected(selectedTabIndex), [])

  const tabs = [
    {
      id: 'Priority',
      content: 'Priority Api Settings',
      panelID: 'priority-settings',
      component: <PrioritySettings settings={settings.priority} />
    },
    {
      id: 'SalesForce',
      content: 'SalesForce Api Settings',
      panelID: 'salesforce-settings',
      component: <SalesForceSettings settings={settings.salesforce} />
    }
  ]
  return <Page>
    <Layout>
      <Layout.Section>
        <LegacyCard>
          <Tabs tabs={tabs} selected={selected} onSelect={handleTabeChange}>
            <LegacyCard.Section>
              {tabs[selected].component}
            </LegacyCard.Section>
          </Tabs>
        </LegacyCard>
      </Layout.Section>
    </Layout>
  </Page>
}

export default Settings