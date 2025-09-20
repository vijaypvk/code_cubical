# Copyright (c) 2025 ByteDance Ltd. and/or its affiliates
# SPDX-License-Identifier: MIT

import unittest
from unittest.mock import patch

from trae_agent.utils.config import Config, ModelConfig, ModelProvider
from trae_agent.utils.legacy_config import LegacyConfig
from trae_agent.utils.llm_clients.anthropic_client import AnthropicClient
from trae_agent.utils.llm_clients.openai_client import OpenAIClient


class TestConfigBaseURL(unittest.TestCase):
    def test_config_with_base_url_in_config(self):
        test_config = {
            "default_provider": "openai",
            "model_providers": {
                "openai": {
                    "model": "gpt-4o",
                    "api_key": "test-api-key",
                    "base_url": "https://custom-openai.example.com/v1",
                }
            },
        }

        config = Config.create_from_legacy_config(legacy_config=LegacyConfig(test_config))

        if config.trae_agent:
            trae_agent_config = config.trae_agent
        else:
            self.fail("trae_agent config is None")

        self.assertEqual(
            trae_agent_config.model.model_provider.base_url,
            "https://custom-openai.example.com/v1",
        )

    def test_config_without_base_url(self):
        test_config = {
            "default_provider": "openai",
            "model_providers": {
                "openai": {
                    "model": "gpt-4o",
                    "api_key": "test-api-key",
                }
            },
        }

        config = Config.create_from_legacy_config(legacy_config=LegacyConfig(test_config))

        if config.trae_agent:
            trae_agent_config = config.trae_agent
        else:
            self.fail("trae_agent config is None")

        self.assertIsNone(trae_agent_config.model.model_provider.base_url)

    def test_default_anthropic_base_url(self):
        config = Config.create_from_legacy_config(legacy_config=LegacyConfig({}))

        if config.trae_agent:
            trae_agent_config = config.trae_agent
        else:
            self.fail("trae_agent config is None")

        # If there are no model providers, the default provider is anthropic
        # and the default base_url is https://api.anthropic.com
        self.assertEqual(
            trae_agent_config.model.model_provider.base_url, "https://api.anthropic.com"
        )

    @patch("trae_agent.utils.llm_clients.openai_client.openai.OpenAI")
    def test_openai_client_with_custom_base_url(self, mock_openai):
        model_config = ModelConfig(
            model="gpt-4o",
            model_provider=ModelProvider(
                api_key="test-api-key",
                provider="openai",
                base_url="https://custom-openai.example.com/v1",
            ),
            max_tokens=4096,
            temperature=0.5,
            top_p=1,
            top_k=0,
            parallel_tool_calls=False,
            max_retries=10,
        )

        client = OpenAIClient(model_config)

        mock_openai.assert_called_once_with(
            api_key="test-api-key", base_url="https://custom-openai.example.com/v1"
        )
        self.assertEqual(client.base_url, "https://custom-openai.example.com/v1")

    @patch("trae_agent.utils.llm_clients.anthropic_client.anthropic.Anthropic")
    def test_anthropic_client_base_url_attribute_set(self, mock_anthropic):
        model_config = ModelConfig(
            model="claude-sonnet-4-20250514",
            model_provider=ModelProvider(
                api_key="test-api-key",
                provider="anthropic",
                base_url="https://custom-anthropic.example.com",
            ),
            max_tokens=4096,
            temperature=0.5,
            top_p=1,
            top_k=0,
            parallel_tool_calls=False,
            max_retries=10,
        )

        client = AnthropicClient(model_config)

        self.assertEqual(client.base_url, "https://custom-anthropic.example.com")

    @patch("trae_agent.utils.llm_clients.anthropic_client.anthropic.Anthropic")
    def test_anthropic_client_with_custom_base_url(self, mock_anthropic):
        model_config = ModelConfig(
            model="claude-sonnet-4-20250514",
            model_provider=ModelProvider(
                api_key="test-api-key",
                provider="anthropic",
                base_url="https://custom-anthropic.example.com",
            ),
            max_tokens=4096,
            temperature=0.5,
            top_p=1,
            top_k=0,
            parallel_tool_calls=False,
            max_retries=10,
        )

        client = AnthropicClient(model_config)

        mock_anthropic.assert_called_once_with(
            api_key="test-api-key", base_url="https://custom-anthropic.example.com"
        )
        self.assertEqual(client.base_url, "https://custom-anthropic.example.com")


class TestLakeviewConfig(unittest.TestCase):
    def get_base_config(self):
        return {
            "default_provider": "anthropic",
            "enable_lakeview": True,
            "model_providers": {
                "anthropic": {
                    "api_key": "anthropic-key",
                    "model": "claude-model",
                    "max_tokens": 4096,
                    "temperature": 0.5,
                    "top_p": 1,
                    "top_k": 0,
                    "max_retries": 10,
                },
                "doubao": {
                    "api_key": "doubao-key",
                    "model": "doubao-model",
                    "max_tokens": 8192,
                    "temperature": 0.5,
                    "top_p": 1,
                    "max_retries": 20,
                },
            },
        }

    def get_config_with_mcp_servers(self):
        return {
            "default_provider": "anthropic",
            "enable_lakeview": True,
            "model_providers": {
                "anthropic": {
                    "api_key": "anthropic-key",
                    "model": "claude-model",
                    "max_tokens": 4096,
                    "temperature": 0.5,
                    "top_p": 1,
                    "top_k": 0,
                    "max_retries": 10,
                },
                "doubao": {
                    "api_key": "doubao-key",
                    "model": "doubao-model",
                    "max_tokens": 8192,
                    "temperature": 0.5,
                    "top_p": 1,
                    "max_retries": 20,
                },
            },
            "mcp_servers": {"test_server": {"command": "echo", "args": [], "env": {}, "cwd": "."}},
        }

    def test_lakeview_defaults_to_main_provider(self):
        config_data = self.get_base_config()

        config = Config.create_from_legacy_config(legacy_config=LegacyConfig(config_data))
        assert config.lakeview is not None
        self.assertEqual(config.lakeview.model.model_provider.provider, "anthropic")
        self.assertEqual(config.lakeview.model.model, "claude-model")

    def test_lakeview_null_values_fallback(self):
        config_data = self.get_base_config()
        config_data["lakeview_config"] = {"model_provider": None, "model_name": None}

        config = Config.create_from_legacy_config(legacy_config=LegacyConfig(config_data))
        assert config.lakeview is not None
        self.assertEqual(config.lakeview.model.model_provider.provider, "anthropic")
        self.assertEqual(config.lakeview.model.model, "claude-model")

    def test_lakeview_disabled_ignores_config(self):
        config_data = self.get_base_config()
        config_data["enable_lakeview"] = False
        config_data["lakeview_config"] = {"model_provider": "doubao", "model_name": "some-model"}

        config = Config.create_from_legacy_config(legacy_config=LegacyConfig(config_data))
        self.assertIsNone(config.lakeview)

    def test_mcp_servers_config(self):
        config_data = self.get_config_with_mcp_servers()
        config = Config.create_from_legacy_config(legacy_config=LegacyConfig(config_data))
        self.assertIn("test_server", config.trae_agent.mcp_servers_config)
        self.assertEqual(config.trae_agent.mcp_servers_config["test_server"].command, "echo")
        self.assertEqual(config.trae_agent.mcp_servers_config["test_server"].args, [])
        self.assertEqual(config.trae_agent.mcp_servers_config["test_server"].env, {})
        self.assertEqual(config.trae_agent.mcp_servers_config["test_server"].cwd, ".")

    def test_mcp_servers_empty_config(self):
        config_data = self.get_base_config()
        config = Config.create_from_legacy_config(legacy_config=LegacyConfig(config_data))

        self.assertEqual(config.trae_agent.mcp_servers_config, {})


if __name__ == "__main__":
    unittest.main()
