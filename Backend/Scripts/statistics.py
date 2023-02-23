import math
import collections.abc


def _get_binomial_posterior(_prior: collections.abc.Callable[[float], float], _data: list[bool],
                            _datapoint_count: int) -> list[any]:
    import numpy as np

    def log(x: float) -> float:
        if x == 0:
            return float("-inf")
        return math.log(x)

    true_count = np.count_nonzero(_data)  # nonzero -> True
    false_count = len(_data) - true_count
    log_probs_of_parameter = []
    linear_range = np.linspace(0, 1, num=_datapoint_count)
    for binomial_parameter in linear_range:
        log_prob_of_parameter = (log(_prior(binomial_parameter))
                                 + log(binomial_parameter) * true_count
                                 + log(1 - binomial_parameter) * false_count)
        log_probs_of_parameter.append(log_prob_of_parameter)
    log_probs_of_parameter = np.array(log_probs_of_parameter)
    log_probs_of_parameter -= np.max(log_probs_of_parameter)
    probs_of_parameter = np.exp(log_probs_of_parameter)
    probs_of_parameter /= np.sum(probs_of_parameter)
    return list((linear_range[i], probs_of_parameter[i]) for i in range(len(linear_range)))


class _WeightsDoNotAddUpException(Exception):
    pass


def get_95_ci(_data: list[bool]) -> tuple[float | None, float | None]:
    """
    Get the Central 95% Confidence Interval for the underlying proportion of "True"s in the dataset.
    Assumes a Uniform prior and that all the datapoints are Independent and Identically Distributed
    :param _data: A list of booleans
    :return: A tuple representing the 95% Confidence Interval
    """

    def get_weighted_percentile(weighted_data: list[any], percentile: float) -> float | None:
        if percentile < 50:
            total_prob = 0
            for x, prob in weighted_data:
                total_prob += prob
                if total_prob >= percentile / 100.0:
                    return x
        else:
            # Count from the high side for efficiency
            percentile = 100 - percentile
            total_prob = 0
            for i in range(len(weighted_data) - 1, -1, -1):
                x, prob = weighted_data[i]
                total_prob += prob
                if total_prob >= percentile / 100.0:
                    return x
        raise _WeightsDoNotAddUpException

    binomial_posterior = _get_binomial_posterior(lambda x: x, _data, _datapoint_count=10000)
    try:
        low = get_weighted_percentile(binomial_posterior, 2.5)
        high = get_weighted_percentile(binomial_posterior, 97.5)
        return low, high
    except _WeightsDoNotAddUpException:
        return 0, 1
