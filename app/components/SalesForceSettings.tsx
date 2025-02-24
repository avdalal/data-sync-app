import { BlockStack, Box, InlineGrid, Page, Text, Card, TextField } from '@shopify/polaris';
import { useState } from 'react';

type SalesForceSettingsProps = {
    settings: {
        url: string;
        apiKey: string;
        apiUser: string;
    };
};

export const SalesForceSettings = ({ settings }: SalesForceSettingsProps) => {

    const [formState, setFormState] = useState({
        url: settings.url,
        userName: settings.apiUser,
        key: settings.apiKey
    });
    return (
        <Page
            primaryAction={{ content: "Save", disabled: false }}

        >
            <BlockStack gap={{ xs: "800", sm: "400" }}>
                <InlineGrid columns={{ xs: "1fr", md: "2fr 5fr" }} gap="400">
                    <Box
                        as="section"
                        paddingInlineStart={{ xs: '400', sm: '0' }}
                        paddingInlineEnd={{ xs: '400', sm: '0' }}
                    >
                        <BlockStack gap="400">
                            <Text as="h3" variant="headingMd">
                                Settings
                            </Text>
                            <Text as="p" variant="bodyMd">
                                The settings for the salesforce API
                            </Text>
                        </BlockStack>
                    </Box>
                    <Card roundedAbove="sm">
                        <BlockStack gap="400">
                            <TextField label="Api URL endpoint" autoComplete="off" value={formState.url} onChange={(value) => setFormState({ ...formState, url: value })} />
                            <TextField label="User Name" autoComplete="off" value={formState.userName} onChange={(value) => setFormState({ ...formState, userName: value })} />
                            <TextField label="key" autoComplete="off" type="password" value={formState.key} onChange={(value) => setFormState({ ...formState, key: value })} />
                        </BlockStack>
                    </Card>
                </InlineGrid>
            </BlockStack>
        </Page>
    )
}