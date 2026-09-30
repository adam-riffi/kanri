from importlib.metadata import version


def test_pipeline_package_is_installed() -> None:
    assert version("pipeline")
